export type AuditTab = "audit" | "useractivity" | "system" | "datachange" | "automation" | "access" | "errors" | "version";
export type ActionType = "Updated" | "Created" | "Deleted" | "Imported";

export interface AuditRow {
  datetime: string;
  userName: string;
  userInitials: string;
  userColor: string;
  action: ActionType;
  module: string;
  reference: string;
  description: string;
  before: string;
  after: string;
  ip: string;
  source: string;
}

export const auditTabs: { id: AuditTab; label: string }[] = [
  { id: "audit",        label: "Audit Trail"            },
  { id: "useractivity", label: "User Activity Logs"     },
  { id: "system",       label: "System Logs"            },
  { id: "datachange",   label: "Data Change Logs"       },
  { id: "automation",   label: "Automation Logs"        },
  { id: "access",       label: "Access Logs"            },
  { id: "errors",       label: "Error & Exception Logs" },
  { id: "version",      label: "Version History"        },
];

export const auditRows: AuditRow[] = [
  {
    datetime: "16 May 2025, 10:32 AM",
    userName: "Vikram Mehta",
    userInitials: "VM",
    userColor: "bg-blue-500",
    action: "Updated",
    module: "Finance",
    reference: "VCH-005925",
    description: "Updated voucher amount Ledger: Salaries-Superme",
    before: "₹45,000.00",
    after: "₹52,500.00",
    ip: "103.45.12.67",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 10:15 AM",
    userName: "Ankit Kumar",
    userInitials: "AK",
    userColor: "bg-green-500",
    action: "Created",
    module: "Finance",
    reference: "VCH-005124",
    description: "Created payment voucher Party: ABC Motors",
    before: "—",
    after: "₹1,25,030.00",
    ip: "103.45.12.67",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 09:58 AM",
    userName: "Sneha Singh",
    userInitials: "SS",
    userColor: "bg-purple-500",
    action: "Deleted",
    module: "Finance",
    reference: "VCH-005023",
    description: "Deleted journal voucher Party: Mac Income",
    before: "₹18,000.00",
    after: "—",
    ip: "103.45.12.10",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 09:40 AM",
    userName: "Vikram Mehta",
    userInitials: "VM",
    userColor: "bg-blue-500",
    action: "Updated",
    module: "Master Data",
    reference: "LED-000345",
    description: "Updated ledger details Ledger: MAC Varma",
    before: "Active",
    after: "Inactive",
    ip: "103.45.12.67",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 09:18 AM",
    userName: "System",
    userInitials: "SY",
    userColor: "bg-gray-500",
    action: "Imported",
    module: "Data Sync",
    reference: "SYNC-003789",
    description: "Imported 56 vouchers from TallyPrime",
    before: "—",
    after: "56 records",
    ip: "System",
    source: "Integration",
  },
  {
    datetime: "16 May 2025, 09:35 AM",
    userName: "Ankit Kumar",
    userInitials: "AK",
    userColor: "bg-green-500",
    action: "Updated",
    module: "Finance",
    reference: "VCH-005022",
    description: "Updated tax amount Ledger: GST Outward",
    before: "₹7,200.00",
    after: "₹7,503.00",
    ip: "103.45.12.67",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 08:32 AM",
    userName: "Sneha Singh",
    userInitials: "SS",
    userColor: "bg-purple-500",
    action: "Created",
    module: "Finance",
    reference: "VCH-005021",
    description: "Created receipt voucher Party: XYZ Traders",
    before: "—",
    after: "₹80,000.00",
    ip: "103.45.12.10",
    source: "Manual",
  },
];

export const actionConfig: Record<ActionType, { bg: string; text: string; dot: string }> = {
  Updated:  { bg: "bg-blue-50",   text: "text-blue-700",  dot: "bg-blue-500"   },
  Created:  { bg: "bg-green-50",  text: "text-green-700", dot: "bg-green-500"  },
  Deleted:  { bg: "bg-red-50",    text: "text-red-700",   dot: "bg-red-500"    },
  Imported: { bg: "bg-orange-50", text: "text-orange-700",dot: "bg-orange-500" },
};

export const logSummary = [
  { label: "Total Logs",      value: "12,418" },
  { label: "Data Changes",    value: "3,214"  },
  { label: "Created",         value: "2,845"  },
  { label: "Updated",         value: "6,128"  },
  { label: "Deleted",         value: "1,485"  },
  { label: "Imported",        value: "1,258"  },
  { label: "Failed / Errors", value: "134",   highlight: true },
];

export const topUsers = [
  { name: "Vikram Mehta", count: 2845 },
  { name: "Ankit Kumar",  count: 2212 },
  { name: "Sneha Singh",  count: 1980 },
  { name: "Leela Varma",  count: 1236 },
  { name: "Rohan Shah",   count: 845  },
];
