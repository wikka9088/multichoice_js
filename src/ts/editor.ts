// import './scss/index.scss';
import $ from "jquery";
// import uuid from "uuid";
// import $ = require("jquery");
import uuid = require('uuid');


class StepMultiChoiceEditor {
    $editorContainer: $<HTMLElement>;
    $summary: $<HTMLElement>;
    $container: $<HTMLElement>;
    questions: Map<string, Question>;
    $questionsPerRound: $<HTMLElement>;
    answersLimit: number;

    constructor() {
        this.$editorContainer = $('#multi-choice-editor');
    }
}

class Question {
    private id: string;
    private value: string;
    private answers: Array<Answer>;

    constructor(value?: string, answers?: Array<Answer>) {
        this.value = value ? value : '';
        this.id = uuid.v4();
        this.answers = answers ? answers : [];
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.value;
    }

    public setTitle(title: string): void {
        this.value = title;
    }

    public hasTitle(): boolean {
        return this.value.length >= 1
    }

    public isTitleEmpty(): boolean {
        return this.value.trim().length === 0;
    }

    public addAnswer(answer: Answer): void {
        this.answers.push(answer);
    }

    public getAnswers(): Array<Answer> {
        return this.answers;
    }

    public hasEnoughAnswers(): boolean {
        return this.answers.length > 1;
    }

    public hasCorrectAnswer(): boolean {
        let hasACorrectAnswer = false;

        this.answers.forEach((answer: Answer) => {
            if (answer.isCorrect()) {
                hasACorrectAnswer = true;
            }
        });

        return hasACorrectAnswer;
    }

    public getAnswersWithoutText(): Map<number, Answer> {
        let answersWithoutText = new Map<number, Answer>();

        this.answers.forEach((answer: Answer, index: number) => {
            if (!answer.hasTitle()) {
                answersWithoutText.set(index, answer);
            }
        });

        return answersWithoutText;
    }

    public getAnswersWithEmptyText(): Map<number, Answer> {
        let answersWithEmptyText = new Map<number, Answer>();

        this.answers.forEach((answer: Answer, index: number) => {
            if (!answer.getTitle().trim().length) {
                answersWithEmptyText.set(index, answer);
            }
        });

        return answersWithEmptyText;
    }

    public questionHasAnswers(): boolean {
        return this.answers.length > 0;
    }
}

class Answer {
    private id: string;
    private answer: string;
    private isRight: boolean;
    private feedback: string;

    constructor(value?: string, isCorrect?: boolean) {
        this.answer = value ? value : '';
        this.isRight = isCorrect ? isCorrect : false;
        this.id = uuid.v4();
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.answer;
    }

    public setTitle(title: string): void {
        this.answer = title;
    }

    public hasTitle(): boolean {
        return this.answer.length >= 1;
    }

    public isCorrect(): boolean {
        return this.isRight;
    }

    public setIsCorrect(isCorrect: boolean): void {
        this.isRight = isCorrect;
    }
}



