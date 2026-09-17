import { Injectable, signal } from '@angular/core';
import { CodingChallenge, ChallengeResult } from '../models/lesson.model';
import { CHALLENGES } from './challenges.data';

@Injectable({ providedIn: 'root' })
export class ChallengeService {
  private readonly STORAGE_KEY = 'angular-mastery-challenges';
  private challenges = signal<CodingChallenge[]>(CHALLENGES);
  private results = signal<ChallengeResult[]>(this.loadResults());

  readonly allChallenges = this.challenges.asReadonly();
  readonly challengeResults = this.results.asReadonly();

  getChallenges(): CodingChallenge[] {
    return this.challenges();
  }

  getChallenge(id: number): CodingChallenge | undefined {
    return this.challenges().find(c => c.id === id);
  }

  getChallengesByCategory(category: string): CodingChallenge[] {
    return this.challenges().filter(c => c.category === category);
  }

  runTests(challengeId: number, code: string): { passed: boolean; results: { testId: number; passed: boolean; message: string }[] } {
    const challenge = this.getChallenge(challengeId);
    if (!challenge) return { passed: false, results: [] };

    const results: { testId: number; passed: boolean; message: string }[] = [];
    let allPassed = true;

    for (const test of challenge.testCases) {
      try {
        const fn = new Function('input', `
          const output = (function() { ${code} })();
          return String(output);
        `);
        const output = fn(test.input);
        const passed = output.trim() === test.expected.trim();
        if (!passed) allPassed = false;
        results.push({
          testId: test.id,
          passed,
          message: passed ? 'Test passed' : `Expected "${test.expected}", got "${output}"`
        });
      } catch (e: any) {
        allPassed = false;
        results.push({
          testId: test.id,
          passed: false,
          message: `Error: ${e.message}`
        });
      }
    }

    if (allPassed) {
      const result: ChallengeResult = {
        challengeId,
        passed: true,
        passedTests: results.filter(r => r.passed).length,
        totalTests: results.length,
        completedAt: new Date()
      };
      this.results.set([...this.results(), result]);
      this.saveResults();
    }

    return { passed: allPassed, results };
  }

  isChallengeCompleted(challengeId: number): boolean {
    return this.results().some(r => r.challengeId === challengeId && r.passed);
  }

  getCompletedCount(): number {
    return this.results().filter(r => r.passed).length;
  }

  private loadResults(): ChallengeResult[] {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          localStorage.removeItem(this.STORAGE_KEY);
        }
      }
    }
    return [];
  }

  private saveResults(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.results()));
    }
  }
}
