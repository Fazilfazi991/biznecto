# 🌐 BIZNECTO: THE COMPLETE PLATFORM GUIDE

This document provides a comprehensive overview of the Biznecto platform, its user roles, lead matching intelligence, and technical infrastructure.

---

## 1. USER IDENTITY & ROLES
Biznecto distinguishes between three primary user types to ensure a professional B2B environment.

*   **Suppliers (`SUP_` prefix):** Focused on listing products, managing company catalogs, and responding to buyer sourcing requests.
*   **Buyers (`BYR_` prefix):** Focused on sourcing products, posting detailed requirements, and finding global manufacturers.
*   **Admins:** Oversee the entire marketplace, moderate new requirements, and manage platform health.

### ID Prefixing Logic
To maintain strict separation, every user is assigned a role-based ID during registration:
- **Buyers:** `BYR_` + unique identifier.
- **Suppliers:** `SUP_` + unique identifier.

---

## 2. THE SUPPLIER JOURNEY
Suppliers join Biznecto to find international customers and grow their exports.

### Lead Matching Intelligence
The system uses a "Tag-Matching" algorithm. If a Supplier's company tags match a Buyer's requirement tags, a **"Hot Lead"** is generated on the Supplier's dashboard.

### Membership Tiers (Pricing)
Access to these leads is governed by the Supplier's selected plan:
| Plan | Match Visibility | Search Ranking | Lead Quality |
| :--- | :--- | :--- | :--- |
| **FREE** | 3 tailored leads | Standard | General |
| **STARTER** | 10 verified leads | Boosted | Verified |
| **PRO** | 25 priority leads | Priority | Verified + Hot |
| **PREMIUM** | Unlimited global leads | Top Placement | All Verified |

---

## 3. THE BUYER JOURNEY
Buyers use Biznecto to find reliable manufacturers and distributors with ease.

### Posting Sourcing Requirements
1.  **Submission:** Buyers fill out a sourcing form (Title, Quantity, Budget, Description).
2.  **Moderation:** The requirement enters a "Pending" state and is hidden from the public until reviewed.
3.  **Discovery:** Once approved, the requirement is broadcasted to matching Suppliers and appears on the public Board.

---

## 4. ADMIN MODERATION
Admins act as the gatekeepers of the platform to ensure high-quality deal flow.

### The Moderation Queue (`/admin`)
*   **Reviewing:** Admins check incoming requirements for clarity and legitimacy.
*   **Approve:** Publishes the lead, notifies matching suppliers, and makes it live.
*   **Reject:** Prevents low-quality or spam requests from entering the marketplace.

---

## 5. TECHNICAL INFRASTRUCTURE
*   **Core:** Next.js 16 (App Router) with Turbopack.
*   **Database:** Neon PostgreSQL (Serverless).
*   **ORM:** Prisma with connection pooling.
*   **Authentication:** NextAuth.js for role-based sessions.
*   **Styling:** Modern Tailwind CSS with custom branding (Biznecto Navy & Teal).

---

## 6. FUTURE ENHANCEMENTS
*   [ ] Direct Messaging between Buyers and Suppliers.
*   [ ] Automated WhatsApp notifications for new matches.
*   [ ] Advanced category filtering in the global directory.
*   [ ] Multi-currency support for price proposals.
