



export class CommonReportUtil {

    /**
     * None of the report parameters cannot be empty
     */
    validateReportParams(params) {
        if(params == null){
            return false;
        }

        Object.keys(params).forEach(function (key, index) {
            if(params[key] == null || params[key] == ''){
                return false;
            }
        });

        return true;
    }
}