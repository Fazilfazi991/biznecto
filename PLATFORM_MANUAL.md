# Biznecto Platform Manual

This manual explains the core workflows, identity systems, and matching logic implemented in the Biznecto platform.

## 1. Database Infrastructure (Neon)
The project has been migrated from Supabase to **Neon (PostgreSQL)** for better connection pooling and performance in the Vercel environment.
*   **Connection:** Managed via `DATABASE_URL` in `.env`.
*   **Schema Sync:** Uses Prisma. Run `npx prisma db push` to sync changes.

---

## 2. Identity & Role System
Biznecto now uses a strict identity separation system to distinguish between Buyers and Suppliers at the database level.

### User Roles
*   **SUPPLIER:** Can list products, manage company profiles, and respond to requirements.
*   **BUYER:** Can post sourcing requirements and search the directory.
*   **ADMIN:** Full access to all features, including the Moderation Queue.

### ID Prefixing
During registration, users are assigned role-specific IDs:
*   **`BYR_...`**: Assiged to Buyers (e.g., `BYR_clp123abc`).
*   **`SUP_...`**: Assigned to Suppliers (e.g., `SUP_clp456def`).

---

## 3. Sourcing Requirements Flow
The lifecycle of a requirement follows a moderated path to ensure quality.

### Phase 1: Posting (Buyers & Admins Only)
*   Only users with the `BUYER` or `ADMIN` role can access the **"+ Post Requirement"** form.
*   Suppliers are restricted from posting to keep the board focused on sourcing leads.

### Phase 2: Moderation (Admin Queue)
*   Newly posted requirements are set to `status: "PENDING"`.
*   They are hidden from the public board and appear in the **Admin Dashboard** (`/admin`).
*   Admins can **Approve** (status becomes `Active`) or **Reject** (status becomes `REJECTED`).

### Phase 3: Public Display
*   Only `Active` requirements are shown on the public `/requirements` board.

---

## 4. Tiered Matching Logic
Suppliers receive customized leads based on their **Pricing Plan** and **Business Tags**.

### Matching Algorithm
The system compares the **Company Tags** (e.g., `Textiles, Apparel`) with the **Requirement Tags**. If there is an overlap, the requirement is flagged as a match for that supplier.

### Pricing Tiers & Limits
The number of matches visible on the Supplier Dashboard is restricted by their subscription:
| Plan | Price | Match Limit | Features |
| :--- | :--- | :--- | :--- |
| **FREE** | $0 | **3 Matches** | Basic visibility |
| **STARTER** | $29 | **10 Matches** | Verified leads |
| **PRO** | $99 | **25 Matches** | Priority ranking |
| **PREMIUM** | $249 | **Unlimited** | Maximum exposure |

---

## 5. Dashboard Experience
The dashboard dynamically adapts to the logged-in user:
*   **Suppliers:** See a "New Buyer Matches" feed with hot leads relevant to their tags.
*   **Buyers:** See a "Buyer Portal" with a call-to-action to post new requirements.
*   **Stats:** Displays real-time match counts and current Plan Type.

---

## 6. How to Update Plans
To change a user's tier for testing:
1. Open the database (Neon Console).
2. Locate the `Company` table.
3. Change the `plan` field to `FREE`, `STARTER`, `PRO`, or `PREMIUM`.
