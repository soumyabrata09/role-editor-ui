import { NgModule } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaskIdPipe } from './pipes/mask-id.pipe';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    MaskIdPipe
  ],
  imports: [
    SpinnerComponent,
    ClipboardModule
  ],
  exports: [ SpinnerComponent, MaskIdPipe, ClipboardModule ]
})
export class SharedModule { }
