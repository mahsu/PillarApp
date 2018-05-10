
export class Utils {

    public static setStateAsync(ctx: any, state: any): Promise<any> {
        return new Promise((resolve) => {
            ctx.setState(state, resolve);
        });
    }

}