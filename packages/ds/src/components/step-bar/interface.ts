export interface Step {
  title: string;
  label: string;
}

export interface StepBarProps {
  items?: Array<Step>;
  minimal?: boolean;
  vertical?: boolean;
  totalSteps?: number;
  dataTestId?: string;
  currentStep: number;
  minimalLabel?: string;
}
