const z = require('zod');

const PatientSchema = z.object({
  patient_first_name: z.string(),
  patient_last_name: z.string(),
});

const PayerSchema = z.object({
  payer_name: z.string(),
  payer_street: z.string(),
  payer_city: z.string(),
  payer_state: z.string(),
  payer_zip_code: z.string(),
  payer_phone: z.string(),
  payer_email: z.string(),
});

const ProviderSchema = z.object({
  provider_name: z.string(),
  provider_street: z.string(),
  provider_city: z.string(),
  provider_state: z.string(),
  provider_zip_code: z.string(),
  provider_phone: z.string(),
  provider_email: z.string(),
});

const InsuranceSchema = z.object({
  insurance_subscriber_id: z.string(),
  insurance_group_id: z.string(),
  insurance_coverage: z.string(),
  insurance_plan: z.string(),
  insurance_effective_date: z.string(),
});

const InvoiceSchema = z.object({
  invoice_id: z.string(),
  invoice_date: z.string(),
  invoice_paid_amount: z.number(),
  invoice_allowed_amount: z.number(),
  invoice_charge_amount: z.number(),
});

const ClaimSchema = z.object({
  claim_id: z.string(),
  claim_issue_date: z.string(),
  claim_paid_amount: z.number(),
  claim_allowed_amount: z.number(),
  claim_charge_amount: z.number(),
});

const InsuranceCardSchema = z.object({
  patient: PatientSchema,
  payer: PayerSchema,
  insurance: InsuranceSchema,
});

const MedicalBillSchema = z.object({
  patient: PatientSchema,
  provider: ProviderSchema,
  invoice: InvoiceSchema,
});

const EOBSchema = z.object({
  patient: PatientSchema,
  payer: PayerSchema,
  provider: ProviderSchema,
  claim: ClaimSchema,
});

module.exports = { InsuranceCardSchema, MedicalBillSchema, EOBSchema };