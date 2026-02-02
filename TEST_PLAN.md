# Test Plan: Comprehensive Site Audit

## Overview
Comprehensive testing of the website including functional testing of all UI elements (buttons, tabs) and a security penetration test.

## Scope
- **In Scope**:
    - All pages in `src/app`
    - All components in `src/components`
    - Functional testing of Buttons, Tabs, Forms
    - Security Pentest (Static Analysis & Vulnerability Assessment)
- **Out of Scope**:
    - Third-party integrations (unless directly interacting)
    - Performance testing (unless critical)

## Test Cases

### Functional Testing (Buttons & Tabs)
- [ ] **Header & Navigation**
    - [ ] Logo Link -> `/`
    - [ ] Navigation Menu Links (`/#catalog`, `/terms`, `/about`, `/contacts`)
    - [ ] "Заказать звонок" Button -> `/contacts`
- [ ] **Home Page**
    - [ ] Hero "Выбрать авто" Button -> `#catalog`
    - [ ] Car Cards "Забронировать" Button -> `/cars/[slug]`
- [ ] **Car Details Page**
    - [ ] Image Gallery (Visual check)
    - [ ] Booking Form "Забронировать" Button (Submit)
    - [ ] Specs Cards (Visual check)
- [ ] **Admin Dashboard** (`/admin`)
    - [ ] Tabs: "Заявки" (Bookings) vs "Автопарк" (Cars)
    - [ ] "Добавить авто" Button -> `/admin/cars/new`
    - [ ] "Редактировать" Button -> `/admin/cars/[id]/edit`
    - [ ] "Delete" Button (DeleteCarButton)
- [ ] **Forms**
    - [ ] Contact Form Submit (Validation check)
    - [ ] Booking Form Submit (Validation check: Name > 2 chars, Phone > 10 chars, Dates required)

### Security Pentest (Vulnerabilities Identified)
- [x] **Broken Access Control (CRITICAL)**
    - [x] `getBookings` (src/lib/data.ts) is public. **VULNERABILITY**: PII Leak (Client names, phones).
    - [x] `createCar`, `updateCar`, `deleteCar` (src/lib/actions.ts) are public. **VULNERABILITY**: Unauthorized DB modification.
    - [x] `/admin` route is public. **VULNERABILITY**: Unrestricted access to admin dashboard.
- [ ] **Injection Flaws**
    - [x] SQL Injection: Mitigated by Prisma.
    - [ ] XSS: React default escaping provides protection.
- [ ] **Sensitive Data Exposure**
    - [x] `getBookings` exposes all booking data.
- [ ] **Input Validation**
    - [x] `submitBooking` has server-side Zod validation. (Good)
    - [x] `createCar` has server-side Zod validation. (Good)

## Schedule
- Phase 1: Code Analysis & Test Case Identification (Completed)
- Phase 2: Functional Testing (Simulation/Review)
- Phase 3: Security Audit (Completed - Critical Issues Found)
- Phase 4: Reporting
