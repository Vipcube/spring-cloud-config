export interface RetryOptions {
  enabled: boolean;
  'max-attempts'?: number;
  'max-interval'?: number;
  'initial-interval'?: number;
  multiplier?: number;
}

export class RetryState {
  public active: boolean = false;
  public attempts: number = 0;
  public currentInterval: number = 0;

  public maxAttempts: number;
  public maxInterval: number;
  public initialInterval: number;
  public multiplier: number;

  constructor(private readonly config: RetryOptions = { enabled: false }) {
    this.maxAttempts = this.getConfigProperty('max-attempts', 6);
    this.maxInterval = this.getConfigProperty('max-interval', 1500);
    this.initialInterval = this.getConfigProperty('initial-interval', 1000);
    this.multiplier = this.getConfigProperty('multiplier', 1.1);
  }

  public registerRetry(): void {
    if (this.attempts >= this.maxAttempts) {
      this.reset();
      throw new Error('Error retrieving remote configuration: Maximum retries exceeded.');
    }

    if (this.attempts === 0) {
      this.active = true;
      this.currentInterval = this.initialInterval;
    } else {
      const nextInterval = Math.round(this.currentInterval * this.multiplier);
      this.currentInterval = nextInterval <= this.maxInterval ? nextInterval : this.maxInterval;
    }

    this.attempts++;
  }

  public reset(): void {
    this.active = false;
    this.attempts = 0;
    this.currentInterval = 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getConfigProperty(propertyName: string, defaultValue: any) {
    return this.config[propertyName] ? this.config[propertyName] : defaultValue;
  }
}
