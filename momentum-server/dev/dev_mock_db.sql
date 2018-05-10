-- Email: test@example.com
-- Password: password
INSERT INTO users(email, company_name, password)
VALUES ('test@example.com', 'Test Company', '$2a$04$pTsyvFOoHGQ5xSwZ8qYvm.tLrBCMe8yvHFWXUlouKA3TY3wK77ySW');

INSERT INTO models(name, description, user_id)
VALUES ('My First Model', 'My Awesome Model', '1');
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Number of transactions', 'revenue', '1000000000', 99999990, 1000000100);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Fixed fee on each transaction', 'revenue', '0.3',0.1,0.4);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Average fee taken by Stripe', 'revenue', '0.029',0.025,0.031);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Fixed fee on each transaction', 'revenue', '50000000000',500000000,5000000005);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Stripe fees on payments', 'revenue', '($1 * $2) + ($3 * $4)',0.0,0.0);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Server Costs', 'expenses', '50000000',4000000,50000050);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Cost per employee', 'expenses', '1000',500,1500);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Office space', 'expenses', '$13*$7',0.0,0.0);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Average fee taken by credit card companies', 'expenses', '0.02',0.01,0.03);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Total volume of payments', 'expenses', '50000000000',5000,5000000005);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Fees paid to credit card companies', 'expenses', '$9*$10',0.0,0.0);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Average salary', 'expenses', '170000',140000,200000);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Number of employees', 'expenses', '950',750,1000);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Employees', 'expenses', '$13*$12',0.0,0.0);
INSERT INTO submodels(model_id, name, category, expression, param_min, param_max)
VALUES ('1', 'Sales', 'expenses', '10',0.0,20.0);