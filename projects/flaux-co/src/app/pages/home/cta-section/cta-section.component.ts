import { Component } from '@angular/core';
import { FlauxSectionComponent } from '@app/shared/section/section.component';
import { FlauxLottieComponent } from '@app/shared/flaux-lottie/flaux-lottie.component';
import { FlauxBtnComponent } from '@app/shared/flaux-btn/flaux-btn.component';
import {FlauxFnComponent} from '@app/shared/fn/fn.component';
import {FlauxRotatingTextComponent} from '@app/shared/flaux-rotating-text/flaux-rotating-text.component';

@Component({
	selector: 'cta-section',
	standalone: true,
	imports: [FlauxSectionComponent, FlauxBtnComponent, FlauxFnComponent, FlauxRotatingTextComponent],
	templateUrl: './cta-section.component.html',
	styleUrls: ['./cta-section.component.scss'],
})
export class CtaSectionComponent {

	scrollFilterFn = (visible: number) => {
		console.debug({ visible });
		return `hue-rotate(${visible * 180}deg) invert(${visible})`;
	};

	questions = [
		'Are you still doing the busywork that AI could do for free?',
		'What if you could understand a 100-page report by asking a single question?',
		'How much time do you waste summarizing meetings and videos each week?',
		'Is your best idea trapped inside a document you don\'t have time to read?',
		'Still manually enhancing images and writing social media blurbs one by one?',
		'Is your team answering the same five customer questions all day, every day?',
		'What\'s the true cost of letting a potential lead leave your website unanswered?',
		'How many more sales could you close if you never missed another inquiry?',
		'Are you paying for staff to do work a simple AI workflow could handle 24/7?',
		'Your chatbot sounds like a robot because it is one. What if it sounded like your best employee?',
		'Are your departments operating in silos, blind to what the others are doing?',
		'What hidden trends and opportunities are locked away inside your scattered business data?',
		'How much growth is being sacrificed to maintain your current, inefficient workflows?',
		'Is the "way you\'ve always done things" becoming your biggest liability?',
		'Are you building a business that can run itself, or are you building a business that can only run you?',
		'Will your business lead the next wave of disruption, or be swept away by it?',
		'What if your most valuable employee wasn\'t a person, but an autonomous AI agent?',
		'Is your competition using AI to build a competitive moat you won\'t be able to cross?',
		'Are you making strategic decisions based on last quarter\'s data or real-time intelligence?',
		'In two years, will you have an AI strategy, or will you be struggling to compete with those who do?'
	]
}
