import { NgModule } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaskIdPipe } from './pipes/mask-id.pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    MaskIdPipe
  ],
  imports: [
    SpinnerComponent,
    ClipboardModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  exports: [ SpinnerComponent, MaskIdPipe, ClipboardModule, ToastrModule ]
})
export class SharedModule { }
