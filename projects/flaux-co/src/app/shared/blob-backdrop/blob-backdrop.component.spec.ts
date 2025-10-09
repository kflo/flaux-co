import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobBackdropComponent } from './blob-backdrop.component';

describe('BlobBackdropComponent', () => {
	let component: BlobBackdropComponent;
	let fixture: ComponentFixture<BlobBackdropComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BlobBackdropComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(BlobBackdropComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should default to 2 blobs', () => {
		expect(component.blobCount).toBe(2);
	});

	it('should use default primary color', () => {
		expect(component.primaryColor).toBe('#3B82F6');
	});

	it('should generate saturated background color', () => {
		component.primaryColor = '#3B82F6';
		const bgColor = component.backgroundBlobColor;
		expect(bgColor).toContain('hsl(');
	});

	it('should show foreground blob only when blobCount is 3', () => {
		component.blobCount = 3;
		fixture.detectChanges();
		const foregroundBlob = fixture.nativeElement.querySelector('.foreground-blob');
		expect(foregroundBlob).toBeTruthy();

		component.blobCount = 2;
		fixture.detectChanges();
		const foregroundBlobAfter = fixture.nativeElement.querySelector('.foreground-blob');
		expect(foregroundBlobAfter).toBeFalsy();
	});
});
