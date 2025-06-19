// src/app/components/quotes/quotes.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent {
  quotes: string[] = [
    '“To be or not to be…”',
    '“I think, therefore I am.”',
    '“Not all those who wander are lost.”',
    '“That’s one small step for man…”',
    '“The only limit to our realization of tomorrow is our doubts of today.”'
  ];
}
// Du kan lägga till fler citat här
// eller hämta dem från en API-tjänst om du vill göra det mer dynam