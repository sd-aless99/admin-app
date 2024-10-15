import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styles: ``
})

export class ChartComponent {

  @Input() deposit: number = 0;
  @Input() withdrawal: number = 0;

   // Doughnut
   public doughnutChartLabels: string[] = [
    'Ingresos',
    'Depositos',
  ];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {data: []}
    ],
  };

  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.doughnutChartData = {labels: this.doughnutChartLabels, datasets: [{data: [this.deposit, this.withdrawal]}]};
  }

  
}
