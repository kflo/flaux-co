import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { CtaSectionComponent } from './cta-section/cta-section.component';
import { Features2SectionComponent } from './features2-section/features2-section.component';

@Component({
  selector: 'flaux-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    HeroSectionComponent,
    FeaturesSectionComponent,
    Features2SectionComponent,
    CtaSectionComponent,
  ],
})
export class FlauxHomePage {}
