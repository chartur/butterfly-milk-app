import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss'],
})
export class NotificationSettingsComponent implements OnInit {

  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  @Input('notificationSettings') notificationSettings: any = {};
  @Output() saveSettings = new EventEmitter<any>();
  constructor(private datePipe: DatePipe) { }

  ngOnInit() {}

  saveNotificationSettings() {
    this.saveSettings.emit(this.notificationSettings);
  }

  changeTime(event) {
    const time = event.detail.value;
    this.notificationSettings.timeSlot = time;
  }

  changeDay(event) {
    const day = event.detail.value;
    this.notificationSettings.dayNumber = day;
  }

}
