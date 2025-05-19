
# 📄 Layout and Structure Documentation  

This document describes the layout behavior and alignment logic of the **Air Arabica Chat Interface**.

---

## 📐 **Body Layout**
- Occupies full viewport height (`100vh`).
- Split vertically into three sections:
  1. **Header** (fixed height at top).
  2. **Main Content** (flexible, fills remaining space).
  3. **Footer** (fixed height at bottom).
- Scrolling is disabled at the body level; it happens only within the **Chat Messages Area**.

---

## 📌 **Header Section**
- Horizontally centered content (`mx-auto`), maximum width: **896px**.
- Vertical stacking of elements (`flex-col`), horizontally centered (`items-center`).
- Content Includes:
  - Logo and Title: Horizontally aligned (`flex`), vertically centered (`items-center`).
  - Tagline: Centered text below the title.
  - Language Selector:
    - Centered horizontally.
    - Buttons wrap if the screen is too small.
    - Uses horizontal spacing between buttons.

---

## 📌 **Main Section (Chat Area)**
- Fills the remaining space between the header and footer (`flex-1`).
- Content is centered horizontally (`items-center`).
- Vertical layout uses Flexbox to distribute space.

### **Chat Messages Area**
- Occupies all remaining vertical space within the main section (`flex-grow`).
- Scrollable internally (`overflow-y-auto`).
- Chat messages are stacked vertically with uniform gaps between them.

### **Quick Suggestions**
- Fixed at the bottom of the chat area, above the input field.
- 4-column grid layout; buttons are equally spaced across the row.

### **Input Area**
- Anchored at the very bottom of the chat area.
- Contains:
  - **Emoji Button**: Fixed size, positioned to the left.
  - **Input Field**: Expands to occupy remaining horizontal space.
  - **Send Button**: Fixed size, positioned to the right.

---

## 📌 **Footer Section**
- Fixed at the very bottom of the viewport.
- Content is horizontally and textually centered.
- Always visible.

---

## 📚 **Scrolling Behavior**
- Only the **Chat Messages Area** is scrollable.
- Header, Footer, Quick Suggestions, and Input Area remain fixed in their respective positions.

---

## 📊 **Visual Representation**

```plaintext

┌──────────────────────────────────────────────┐
│                   HEADER                     │
│  (Centered logo, title, tagline, languages)  │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│                    MAIN                      │
│  ┌────────────────────────────────────────┐  │
│  │            CHAT MESSAGES AREA          │  │
│  │ (Scrollable vertical area for messages)│  │
│  └────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │          QUICK SUGGESTIONS (Grid)      │  │
│  │ (4 equally spaced action buttons)      │  │
│  └────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │            INPUT AREA (Bottom)          │  │
│  │ [Emoji]   [Input Field Expands]   [Send]│  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│                    FOOTER                     │
│  (Centered text, always visible at bottom)    │
└──────────────────────────────────────────────┘
```plaintext

