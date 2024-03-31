import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {

  @Input() 
  spinnerColorBootstrap!: string;
  spinners: number[] = Array.from(Array(5).keys()).map(x => x+1);
  private DEFAULT_BOOTSPRAP_SPINNER_COLOR: string = "text-secondary";

  ngOnInit(): void {
    this.spinnerColorBootstrap = this.spinnerColorBootstrap ? this.spinnerColorBootstrap : this.DEFAULT_BOOTSPRAP_SPINNER_COLOR;
  }
}
