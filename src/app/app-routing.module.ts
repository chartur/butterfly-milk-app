import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthMiddleware} from './middleware/AuthMiddleware';
import {LogedInMiddleware} from './middleware/LogedInMiddleware';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [LogedInMiddleware] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LogedInMiddleware] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthMiddleware] },
  { path: 'subscription', loadChildren: './pages/subscriptions/subscriptions.module#SubscriptionsPageModule' },
  { path: 'fundamentals', loadChildren: './pages/fundamentals/fundamentals.module#FundamentalsPageModule'},
  { path: 'fundamentals/abc', loadChildren: './pages/fundamentals/abc/abc.module#AbcPageModule' },
  { path: 'fundamentals/combinations', loadChildren: './pages/fundamentals/combinations/combinations.module#CombinationsPageModule' },
  { path: 'fundamentals/sight-words', loadChildren: './pages/fundamentals/sight-words/sight-words.module#SightWordsPageModule' },
  { path: 'fundamentals/syllables', loadChildren: './pages/fundamentals/syllables/syllables.module#SyllablesPageModule' },
  { path: 'books', loadChildren: './pages/books/books.module#BooksPageModule' },
  { path: 'dictionary', loadChildren: './pages/dictionary/dictionary.module#DictionaryPageModule' },
  { path: 'quizzes', loadChildren: './pages/quizzes/quizzes.module#QuizzesPageModule' },
  { path: 'quizzes/:passedPosition', loadChildren: './pages/quizzes/quizzes.module#QuizzesPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule', canActivate: [AuthMiddleware] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
