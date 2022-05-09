import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { AboutComponent } from './pages/about/about.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  {path: '', component: CardComponent},
  {path: 'about', component: AboutComponent},
  {path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
