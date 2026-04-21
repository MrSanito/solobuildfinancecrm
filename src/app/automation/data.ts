export const automationRows = [
  { name: "Bank Statement Reconciliation",  sub: "Auto match bank transactions",   cat: "Process Automation", trigger: "Bank Statement Uploaded",     purpose: "Auto reconcile bank entries",   status: "Active", lastExec: "16 May, 08:45 AM", rate: 99.2, execs: 398 },
  { name: "Payment Reminder (Overdue)",     sub: "Send reminder to overdue customers", cat: "Action Automation",  trigger: "Receivable Overdue (N Days)", purpose: "Improve collections",           status: "Active", lastExec: "16 May, 08:30 AM", rate: 97.6, execs: 210 },
  { name: "Expense Auto-Categorization",   sub: "Auto categorize expenses",        cat: "Process Automation", trigger: "Expense Voucher Created",     purpose: "Maintain accuracy",             status: "Active", lastExec: "16 May, 08:20 AM", rate: 98.9, execs: 188 },
  { name: "GST Due Date Alert",            sub: "Notify before GST filing due date", cat: "Action Automation",  trigger: "Scheduled (Daily)",           purpose: "Ensure compliance",             status: "Active", lastExec: "16 May, 07:02 AM", rate: 100,  execs: 84  },
  { name: "Cash Flow Threshold Alert",     sub: "Alert when cash below threshold", cat: "Control Automation", trigger: "Cash Balance Updated",        purpose: "Prevent cash shortfall",        status: "Active", lastExec: "16 May, 06:45 AM", rate: 97.2, execs: 72  },
  { name: "Vendor Payment Approval",       sub: "Auto route high value payments",  cat: "Control Automation", trigger: "Payment Created",             purpose: "Maintain approval policy",      status: "Active", lastExec: "15 May, 09:18 PM", rate: 98.7, execs: 64  },
  { name: "Inventory Reorder Alert",       sub: "Alert when stock below reorder level", cat: "Action Automation", trigger: "Stock Level Below Threshold", purpose: "Avoid stockouts",            status: "Active", lastExec: "15 May, 07:13 PM", rate: 96.3, execs: 48  },
  { name: "TDS Due Date Reminder",         sub: "Reminder for TDS deposit",        cat: "Action Automation",  trigger: "Scheduled (Daily)",           purpose: "Ensure timely deposit",         status: "Active", lastExec: "15 May, 07:00 AM", rate: 100,  execs: 42  },
];

export const execLogRows = [
  { id: "EXE-2025-05-16-001248", name: "Bank Statement Reconciliation",  sub: "Auto match bank transactions",   cat: "Process Automation", trigger: "Bank Statement Uploaded",     entity: "SB Auto Parts",    status: "Success",  execAt: "16 May 2025, 09:12 AM", dur: "2.3s",  records: 125 },
  { id: "EXE-2025-05-16-001247", name: "Payment Reminder (Overdue)",     sub: "Send reminder to overdue customers", cat: "Action Automation",  trigger: "Receivable Overdue (N Days)", entity: "SB Auto Pvt Ltd",  status: "Success",  execAt: "16 May 2025, 09:10 AM", dur: "1.84s", records: 18  },
  { id: "EXE-2025-05-16-001246", name: "Expense Auto-Categorization",   sub: "Auto categorize expenses",        cat: "Process Automation", trigger: "Expense Voucher Created",     entity: "SB Retail",        status: "Success",  execAt: "16 May 2025, 09:08 AM", dur: "1.62s", records: 37  },
  { id: "EXE-2025-05-16-001245", name: "GST Due Date Alert",            sub: "Notify before GST filing",        cat: "Action Automation",  trigger: "Scheduled (Daily)",           entity: "SB Exports",       status: "Failed",   execAt: "16 May 2025, 09:00 AM", dur: "0.65s", records: 0   },
  { id: "EXE-2025-05-16-001244", name: "Cash Flow Threshold Alert",     sub: "Alert when cash below threshold", cat: "Control Automation", trigger: "Cash Balance Updated",        entity: "SB Logistics",     status: "Success",  execAt: "16 May 2025, 08:45 AM", dur: "1.3s",  records: 1   },
  { id: "EXE-2025-05-16-001243", name: "Vendor Payment Approval",       sub: "Auto route high value payments",  cat: "Control Automation", trigger: "Payment Created",             entity: "SB Motors",        status: "Success",  execAt: "16 May 2025, 09:30 AM", dur: "2.1s",  records: 1   },
  { id: "EXE-2025-05-16-001242", name: "Inventory Reorder Alert",       sub: "Alert when stock below reorder",  cat: "Action Automation",  trigger: "Stock Level Below Threshold", entity: "SB Utilities",     status: "Success",  execAt: "16 May 2025, 08:15 AM", dur: "1.08s", records: 6   },
  { id: "EXE-2025-05-16-001241", name: "TDS Due Date Reminder",         sub: "Reminder for TDS deposit",        cat: "Action Automation",  trigger: "Scheduled (Daily)",           entity: "SB Auto Exports",  status: "Failed",   execAt: "16 May 2025, 08:00 AM", dur: "0.76s", records: 0   },
  { id: "EXE-2025-05-16-001240", name: "Invoice Data Extraction",       sub: "Extract data from uploaded invoices", cat: "Process Automation", trigger: "Invoice Document Uploaded", entity: "SB Auto Parts",   status: "Success",  execAt: "16 May 2025, 07:50 AM", dur: "3.2s",  records: 42  },
  { id: "EXE-2025-05-16-001239", name: "Duplicate Payment Check",       sub: "Detect duplicate payments",       cat: "Process Automation", trigger: "Payment Created",             entity: "SB Retail",        status: "Success",  execAt: "16 May 2025, 07:40 AM", dur: "1.27s", records: 0   },
];

export const activityRows = [
  { time: "16 May 2025\n08:12 AM", activity: "Bank statement uploaded\nFile: HDFC_00020025.csv",          automation: "Bank Statement Reconciliation",  cat: "Process Automation", entity: "SB Auto Parts",    status: "Success", triggeredBy: "System",     details: "513 transactions processed" },
  { time: "16 May 2025\n09:10 AM", activity: "Invoice INV-2025-1287 (3 days overdue)",                   automation: "Payment Reminder (Overdue)",     cat: "Action Automation",  entity: "SB Auto Pvt Ltd",  status: "Success", triggeredBy: "System",     details: "Reminder sent to customer" },
  { time: "16 May 2025\n09:08 AM", activity: "Expense categorized\nEXP-2025-0231",                       automation: "Expense Auto-Categorization",    cat: "Process Automation", entity: "SB Retail",        status: "Success", triggeredBy: "System",     details: "Category: Office Supplies" },
  { time: "16 May 2025\n09:00 AM", activity: "GST due date check failed\nReturn: GSTR-1\nMay 2025",      automation: "GST Due Date Alert",             cat: "Action Automation",  entity: "SB Exports",       status: "Failed",  triggeredBy: "System",     details: "Due date passed on 15 May 2025" },
  { time: "16 May 2025\n08:45 AM", activity: "Cash balance below threshold\nAvailable: ₹1,24,560",       automation: "Cash Flow Threshold Alert",      cat: "Control Automation", entity: "SB Logistics",     status: "Success", triggeredBy: "System",     details: "Alert sent to Finance team" },
  { time: "16 May 2025\n08:30 AM", activity: "Vendor payment created\nVEND-2025-1672",                   automation: "Vendor Payment Approval",        cat: "Control Automation", entity: "SB Motors",        status: "Success", triggeredBy: "John Patel", details: "Payment queued for approval" },
  { time: "16 May 2025\n08:15 AM", activity: "Stock below reorder level\nItem: Brake Pad - EP1228",      automation: "Inventory Reorder Alert",        cat: "Action Automation",  entity: "SB Utilities",     status: "Success", triggeredBy: "System",     details: "PO suggested to vendor" },
  { time: "16 May 2025\n08:00 AM", activity: "TDS deposit reminder sent\nChallan: CPF032456",            automation: "TDS Due Date Reminder",          cat: "Action Automation",  entity: "SB Auto Exports",  status: "Failed",  triggeredBy: "System",     details: "Email delivery failed" },
  { time: "16 May 2025\n07:50 AM", activity: "Invoice document captured\nINV-2025-1288.pdf",             automation: "Invoice Data Extraction",        cat: "Process Automation", entity: "SB Auto Parts",    status: "Success", triggeredBy: "System",     details: "Data extracted successfully" },
  { time: "16 May 2025\n07:13 AM", activity: "Duplicate payment detected\nRef: PAY-2025-9105",           automation: "Duplicate Payment Check",        cat: "Control Automation", entity: "SB Retail",        status: "Success", triggeredBy: "System",     details: "Marked as duplicate and skipped" },
];

export const categoryPieData = [
  { name: "Process Automation",   value: 36, color: "#3b82f6" },
  { name: "Action Automation",    value: 28, color: "#8b5cf6" },
  { name: "Control Automation",   value: 22, color: "#f97316" },
  { name: "Data Automation",      value: 16, color: "#14b8a6" },
  { name: "Workflow Automation",  value: 10, color: "#6366f1" },
];

export const activityPieData = [
  { name: "Success",             value: 312, color: "#22c55e" },
  { name: "Failed",              value: 28,  color: "#ef4444" },
  { name: "Manual Intervention", value: 16,  color: "#f97316" },
  { name: "Skipped",             value: 0,   color: "#94a3b8" },
];

export const timelineData = [
  { time: "12AM", v: 4  }, { time: "2AM",  v: 2  }, { time: "4AM",  v: 6  },
  { time: "6AM",  v: 18 }, { time: "8AM",  v: 42 }, { time: "10AM", v: 58 },
  { time: "12PM", v: 65 }, { time: "2PM",  v: 48 }, { time: "4PM",  v: 72 },
  { time: "6PM",  v: 55 }, { time: "8PM",  v: 30 }, { time: "10PM", v: 14 },
];

export const topActivities = [
  { name: "Bank Statement Reconciliation", count: 86 },
  { name: "Payment Reminder (Overdue)",    count: 64 },
  { name: "Expense Auto-Categorization",  count: 42 },
  { name: "Cash Flow Threshold Alert",    count: 28 },
];
