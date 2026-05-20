# TEST PLAN

## Overview

This document outlines the testing strategy and validation approach used for the PO Tracker frontend prototype.

The goal of testing was to validate:
- purchase order filtering behavior
- dashboard calculations
- comment workflows
- responsive layouts
- drawer interactions
- print functionality
- overall workflow usability

---

# Testing Approach

The application was tested using a combination of:
- automated unit tests
- manual UI testing
- responsive browser testing

---

# Automated Unit Tests

Unit tests were implemented using Vitest.

## Areas Covered

### Purchase Order Filtering
Validated:
- search term filtering
- confirm code filtering
- assignee filtering
- date range filtering

### Dashboard Statistics
Validated:
- total purchase order count
- total amount calculations
- status-based summary counts

### Comment Utilities
Validated:
- comment creation
- empty comment validation
- purchase order comment updates
- immutable state updates

---

# Manual Testing

## Authentication Flow

| Scenario | Expected Result |
|---|---|
| User visits app while logged out | Redirected to login page |
| User signs in | Redirected to dispatched POs |
| User logs out | Returned to login page |

---

## Dashboard

| Scenario | Expected Result |
|---|---|
| Dashboard loads | Summary cards render correctly |
| Recent activity displays | Recent comments appear |
| Needs attention section renders | Relevant POs appear |

---

## Dispatched Purchase Orders Table

| Scenario | Expected Result |
|---|---|
| Search by PO number | Matching POs displayed |
| Search by vendor | Matching POs displayed |
| Filter by confirm code | Correct rows displayed |
| Filter by assignee | Correct rows displayed |
| Filter by business unit | Correct rows displayed |
| Filter by date range | Correct rows displayed |
| Empty filter state | No errors displayed |

---

## Purchase Order Drawer

| Scenario | Expected Result |
|---|---|
| Click table row | Drawer opens |
| Click outside drawer | Drawer closes |
| Drawer animation | Smooth slide-in animation |
| PO details display | Correct data shown |
| Vendor information displays | Correct data shown |
| EDI details display | Correct line data shown |

---

## Comments Workflow

| Scenario | Expected Result |
|---|---|
| Add valid comment | Comment appears |
| Add empty comment | Comment not added |
| Add multiple comments | Comments scroll correctly |
| New comment added | Auto-scroll moves to newest comment |

---

# Responsive Testing

Responsive behavior was manually validated using browser developer tools.

## Tested Breakpoints

- Mobile
- Tablet
- Desktop
- Large desktop

## Areas Validated

- filter toolbar wrapping
- responsive dashboard cards
- horizontal table scrolling
- responsive drawer layout
- responsive navigation/header
- print layout scaling

---

# Print Testing

The purchase order print workflow was manually validated.

## Validated Behaviors

- print preview opens successfully
- landscape layout renders correctly
- printable PO fits on one page
- vendor/shipping sections display correctly
- line items render correctly
- total amount section renders correctly