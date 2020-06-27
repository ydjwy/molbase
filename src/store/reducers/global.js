import Model from "../model";
export default Model.getInstance(
    class extends Model {
        namespace = "global";
        state = {
            pathname: "",
        };

        actions = {};

        reducers = {
            setPathname(state, {payload: pathname}) {
                return {
                    ...state,
                    pathname
                };
            },
        };
    }
);
