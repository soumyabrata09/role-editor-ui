import { ToastrService } from "ngx-toastr";

export class ErrorHandler {

    /**
     * This method handles and error callback
     * @param error : Error 
     * @param detailedMsg : string
     * @param toastr : ToastrService
     */
    static handleError(error: Error, detailedMsg: string, toastr: ToastrService) {
        toastr.error(error.message, detailedMsg);
    }
}
