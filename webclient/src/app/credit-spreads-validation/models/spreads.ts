
export class SpreadsCommon {
  isin: string;
  instr_ref: string;
  currency: string;
  region: string;
  sector: string;
  with_positions: boolean;
}


export class SpreadsValidation {
  implied_rating: string;
  credit_spread: number | string;
  credit_spread_fam: number | string;
  credit_spread_brokers: number | string;
  credit_spread_barclays: number | string;
  credit_spread_bnp: number | string;
  credit_spread_citi: number | string;
  credit_spread_daiwa: number | string;
  credit_spread_deutschebank: number | string;
  credit_spread_nomura: number | string;
  is_validate: boolean;
  credit_spread_fam_text: string;
  base_ptr_id: number;
}

export class Spread {
  base_ptr_id: number;
  common: SpreadsCommon;
  pre_valid: SpreadsValidation;
  valid: SpreadsValidation;
}

export class SpreadRating {
  rating_sort: number;
  credit_spread_to: number;
  implied_rating: string;
}

export class OfficialRatings {
  instr_ref: string;
  issuer_credit_rating_s_p: string;
  issuer_credit_rating_moodys: string;
  credit_rating_s_p: string;
  credit_rating_moodys: string;
  date: number;
}

export class CriticalTransition {
  transition_rating: string;
  transition_spread: number;
}

