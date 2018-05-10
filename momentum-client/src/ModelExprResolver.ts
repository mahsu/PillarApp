const jsep = require('jsep');

type JsepExpression = any;

interface Variables {
    [index: string]: number;
}

interface SubExpr {
    [index: string]: JsepExpression;
}

interface ExpressionMapping {
    [index: string]: JsepExpression;
}

/* interface DataPoint {
    x: number;
    revenue: number;
    expenses: number;
    profit: number;
}*/

export default class ModelExprResolver {
    private submodels: [any];
    private sensitivity: any;
    private exprMapping: ExpressionMapping; // raw expression mapping of id -> expression|literal
    private variables: Variables; // evaluated variables: id -> literal
    private subExpr: SubExpr; // evaluated subExpr: id -> expression
    private subEval: Variables;
    private _isConstraintValid: boolean;

    // Try to evaluate / simplify a jsep expression, modifies the expression in place
    static trySimplify(node: JsepExpression): JsepExpression | number {

        if (node.type === 'BinaryExpression') {
            let left: JsepExpression | number = ModelExprResolver.trySimplify(node.left);
            let right: JsepExpression | number = ModelExprResolver.trySimplify(node.right);
            if (typeof(left) === 'number' && typeof(right) === 'number') {
                let result = ModelExprResolver.evalBinOp(node.operator, left, right);
                return {
                    'raw': result + '',
                    'type': 'Literal',
                    'value': left
                };
            } else {
                if (typeof(left) === 'number') {
                    return {
                        'raw': left + '',
                        'type': 'Literal',
                        'value': left
                    };
                } else if (typeof(right) === 'number') {
                    return {
                        'raw': right + '',
                        'type': 'Literal',
                        'value': right
                    };
                } else {
                    return node;
                }
            }
        } else if (node.type === 'Literal') {
            // todo check if number
            return node.value;
        } else {
            return node;
        }
    }

    static evalBinOp(op: string, left: number, right: number) {
        let result = 0;
        switch (op) {
            case '+':
                result = left + right;
                break;
            case '-':
                result = left - right;
                break;
            case '/':
                result = left / right;
                break;
            case '*':
                result = left * right;
                break;
            default:
                console.log('Unknown operator ' + op);
                break;
        }
        return result;
    }

    static isExprLiteral(node: JsepExpression): boolean {
        return (node.type === 'Literal');
    }

    constructor(submodels: [any]) {
        this.sensitivity = {};
        this.submodels = submodels;
        this.exprMapping = {};
        this.variables = {};
        this.subEval = {};
        this.subExpr = {};
        this._isConstraintValid = false;

        for (let s of submodels) {
            let node = jsep(s.expression);
            let key = '$' + s.id;

            this.sensitivity[key] = {min: s.param_min, max: s.param_max};
            // console.log(key, node);
            this.exprMapping[key] = node;
            if (ModelExprResolver.isExprLiteral(node)) {
                this.variables[key] = node.value;
            } else {
                this.subExpr[key] = node;
            }
        }
        if (this.resolveSubmodels()) {
            this._isConstraintValid = true;
        }

    }

    getVariables() {
        return this.variables;
    }

    getEvaluatedSubmodels() {
        return this.subEval;
    }

    isConstraintValid() {
        return this._isConstraintValid;
    }

    // returns true on successful resolution, false otherwise
    resolveSubmodels(maxdepth: number = 20): boolean {
        let toEvaluate = new Set(Object.keys(this.subExpr));
        // attempt to resolve variables up to maxdepth times
        for (let i = 0; i < maxdepth; i++) {
            for (let k of Array.from(toEvaluate)) {
                if (k in this.subExpr) {
                    let evalResult = this.evalResolveSubmodel(this.subExpr[k]);
                    if (evalResult == null) {
                        continue;
                    }
                    this.subEval[k] = evalResult;
                    toEvaluate.delete(k);
                } else {
                    console.log('Error! Key ' + k + 'not found in expression dictionary');
                }
            }

            if (toEvaluate.size === 0) {
                console.log('Finished resolving in ', maxdepth, ' iterations.');
                return true;
            }
        }

        return false;
    }

    evalResolveSubmodel(node: JsepExpression): number | null {

        let result: number = 0;

        if (node.type === 'BinaryExpression') {
            let left: number | null = this.evalResolveSubmodel(node.left);
            let right: number | null = this.evalResolveSubmodel(node.right);

            if (left == null || right == null) {
                return null;
            }

            return ModelExprResolver.evalBinOp(node.operator, left, right);

        } else if (node.type === 'Literal') {
            // todo check if number
            result = node.value;
        } else if (node.type === 'Identifier') {
            if (node.name.startsWith('$')) {
                if (node.name in this.variables) {
                    return this.variables[node.name];
                } else if (node.name in this.subEval) {
                    return this.subEval[node.name];
                }
            } else {
                return null;
            }
        }

        return result;
    }

    testScenario(variable: string, samples: number): any {
        let oldVal = this.variables[variable];

        let {min, max} = this.sensitivity[variable];
        console.log('min, max', min, max);

        let step = (max - min) / samples;
        let dataseries = [];

        for (let i = min; i < max; i += step) {
            this.variables[variable] = i;
            this.subEval = {};
            this.resolveSubmodels();
            let totalRevenue = 0;
            let totalExpense = 0;
            this.submodels.forEach((submodel: any) => {
                let key = '$' + submodel.id;
                if (key in this.subEval) {
                    switch (submodel.category) {
                        case 'revenue':
                            totalRevenue += this.subEval[key];
                            break;
                        case 'expenses':
                            totalExpense += this.subEval[key];
                            break;
                        default:
                            console.log('Unknown category');
                            break;
                    }
                }
            });
            dataseries.push({
                x: i,
                revenue: totalRevenue,
                expenses: totalExpense,
                profit: (totalRevenue - totalExpense)
            });
        }

        this.variables[variable] = oldVal;
        this.subEval = {};
        this.resolveSubmodels();

        return dataseries;
    }

    // todo rewrite this stuff using the visitor pattern
}