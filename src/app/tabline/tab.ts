import {Component, Input, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {LoadingPreference} from '../preferences/LoadingPreference';
import {StudentService} from '../services/student.service';
import {HandleService} from '../services/handle.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-tabs',
    templateUrl: './tab.html',
    styleUrls: ['./tab.scss'],
})
export class TabsPage implements OnInit{
    // this tells the tabs component which Pages
    // should be each tab's root Page

    @Input() loggedIn: boolean;



    constructor(
        public alertController: AlertController,
        private authService: AuthService,
        private router: Router,
        private loadingPref: LoadingPreference,
        private studentService: StudentService,
        private handler: HandleService,
        private navCtrl: NavController,
    ) {}

    ngOnInit(): void {

    }

    async chooseStudent() {

        const loading = await this.loadingPref.make();

        loading.present();

        try {
            const request: any = await this.handler.run(this.studentService.getStudents());
            let students = request.data.students;
            students = students.map((student) => {
                return {
                    id: student.id,
                    studentName: student.name + ' ' + student.surname,
                    name: 'student',
                    type: 'radio',
                    label: student.name + ' ' + student.surname,
                    value: student.id,
                    checked: student.id == parseInt(localStorage.getItem('student'))
                };
            });
            const alert = await this.alertController.create({
                header: 'Choose Student',
                inputs: students,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: data => {
                        }
                    },
                    {
                        text: 'Choose',
                        handler: data => {
                            this.authService.storItem('student', data);
                            this.navCtrl.navigateRoot(this.router.url);
                        }
                    }
                ]
            });

            alert.present();
        } catch (e) {
            this.handler.presentAlert(e.error.message, e);
        }

        loading.dismiss();
    }
}
