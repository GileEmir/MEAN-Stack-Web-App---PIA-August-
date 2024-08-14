import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { GardenSchedulingService } from '../../services/garden-scheduling.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-decor-statistics',
  templateUrl: './decor-statistics.component.html',
  styleUrls: ['./decor-statistics.component.css']
})
export class DecorStatisticsComponent implements OnInit {
  single: any[] = [];
  jobsDistribution: any[] = [];
  averageJobsPerDay: any[] = [];

  my_user: User = new User();

  view: [number, number] = [700, 400];

  // Options for charts
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Jobs';

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private gardenSchedulingService: GardenSchedulingService,private userService:UserService) {}

  ngOnInit(): void {
    this.loadUser();
    this.fetchJobsPerMonth();
    this.fetchJobsDistribution();
    this.fetchAverageJobsPerDay();
  }

  private loadUser(): void {
    const user = this.userService.getLoggedInUser();
    if (user) {
      console.log(user);
      this.my_user = user;
    }
  }

  fetchJobsPerMonth(): void {
    this.gardenSchedulingService.getJobsPerMonthForUser(this.my_user.username).subscribe(data => {
      this.single = data.map(schedule => ({
        name: schedule.date,
        value: schedule.jobsCount
      }));
    });
  }

  fetchJobsDistribution(): void {

    this.gardenSchedulingService.getJobsDistributionByCompany(this.my_user.companyId ?? '').subscribe(data => {
      this.jobsDistribution = data.map((schedule: any) => ({
        name: schedule.workerId,
        value: schedule.jobsCount
      }));
    });
  }

  fetchAverageJobsPerDay(): void {
    this.gardenSchedulingService.getAverageJobsPerDay(this.my_user.companyId ?? '').subscribe(data => {
      this.averageJobsPerDay = data.map((schedule: any) => ({
        name: schedule.date,
        value: schedule.jobsCount
      }));

      const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      this.averageJobsPerDay.sort((a, b) => {
        return daysOrder.indexOf(a.name) - daysOrder.indexOf(b.name);
      });
    });
  }

  onSelect(event: any): void {
    console.log(event);
  }
}