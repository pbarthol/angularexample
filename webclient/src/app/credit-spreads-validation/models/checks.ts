
export class CheckResult {
  id: number;
  label: string;
  friendly_label: string;
  failed: boolean;
  score: number;
  hint: string;
}

export class Check {
  base_ptr_id: number;
  checksResults: CheckResult[];
}

export class Summary {
  base_ptr_id: number;
  failed: boolean;
  score_max: number;
}
