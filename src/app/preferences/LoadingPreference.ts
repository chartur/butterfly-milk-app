import { LoadingController } from '@ionic/angular';

export class LoadingPreference extends LoadingController{
     make() {
        return this.create({
            duration: 50000,
            message: 'Please wait...',
            translucent: true,
        });
    }
}
