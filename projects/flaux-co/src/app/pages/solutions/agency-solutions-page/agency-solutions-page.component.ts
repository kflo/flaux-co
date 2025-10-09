import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";
import { BlobBackdropComponent } from "@app/shared/blob-backdrop";
import {environment} from 'projects/flaux-co/environments/environment';

@Component({
	selector: 'agency-solutions-page',
	imports: [FlauxSectionComponent, BlobBackdropComponent],
	templateUrl: './agency-solutions-page.component.html',
	styleUrl: './agency-solutions-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencySolutionsPageComponent {
	imageUrl = '../../../../assets/img/driveDL/Business App/Copy of Group 48489.png';
	// imageUrl = `${environment.r2BucketUrl}img/drive DL/Business App/business-app-19189.png`;
}
