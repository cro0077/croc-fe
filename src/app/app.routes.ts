import { Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { HomeComponent } from './components/home/home.component';
import { ReportGenComponent } from './components/report/report-gen/report-gen.component';
import { ReportInfoComponent } from './components/report/report-info/report-info.component';
import { ContactUs } from './components/contact-us/contact-us';
import { DealsComponent } from './components/deals/deals';
import { PayComponent } from './components/pay/pay.component';
import { ErrorPayComponent } from './components/pay/error-pay/error-pay.component';
import { SuccessPayComponent } from './components/pay/success-pay/success-pay.component';

export const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        title: "Car Croc",
        children: [
            {
                path: '',
                component: HomeComponent,
                pathMatch: 'full',
                title: 'Car Croc'
            },
            {
                path: 'report',
                children: [
                    {
                        path: '',
                        component: ReportGenComponent
                    },
                    {
                        path: ':vinId',
                        component: ReportGenComponent
                    },
                    {
                        path: 'info/:path',
                        component: ReportInfoComponent,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'deals',
                component: DealsComponent
            },
            {
                path: 'contact',
                component: ContactUs
            },
            {
                path: 'croco/:type/:vinId',
                children: [
                    {
                        path: '',
                        component: PayComponent
                    },
                    {
                        path: 'failure',
                        component: ErrorPayComponent
                    },
                    {
                        path: 'success',
                        component: SuccessPayComponent
                    },
                ]
            }
        ]
    }
]