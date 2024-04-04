import { ToastrService } from "ngx-toastr";

export class ErrorHandler {

    static handleError(error: Error, detailedMsg: string, toastr: ToastrService) {
        toastr.error(error.message, detailedMsg);
    }
}
