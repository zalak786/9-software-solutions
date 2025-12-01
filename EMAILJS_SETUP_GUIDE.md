# EmailJS & reCAPTCHA Setup Guide

## 🎯 Overview
Your contact form now uses **EmailJS** (free email service) and **Google reCAPTCHA v3** (bot protection) - NO backend required!

---

## 📧 Step 1: EmailJS Setup (5 minutes)

### 1.1 Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's FREE - 200 emails/month)
3. Verify your email address

### 1.2 Add Email Service
1. In EmailJS dashboard, click "Add New Service"
2. Choose your email provider (Gmail recommended):
   - Select "Gmail"
   - Click "Connect Account"
   - Sign in with your **info@9softwaresolutions.com** account
   - Note down your **Service ID** (e.g., `service_abc123`)

### 1.3 Create Email Template
1. Click "Email Templates" → "Create New Template"
2. Set template like this:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Content:**
```
You have a new message from your website contact form:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent via 9 Software Solutions contact form
```

3. Note down your **Template ID** (e.g., `template_xyz789`)

### 1.4 Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `a1b2c3d4e5f6g7h8`)

---

## 🔒 Step 2: Google reCAPTCHA Setup (3 minutes)

### 2.1 Register Site
1. Go to [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. Fill in:
   - **Label**: "9 Software Solutions Contact Form"
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your website domain (e.g., `9softwaresolutions.com`)
     - For local testing, also add: `localhost`
3. Accept terms and click "Submit"

### 2.2 Get Keys
After submission, you'll see two keys:
- **Site Key** (public key) - e.g., `6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
- **Secret Key** (keep private, not needed for frontend-only setup)

---

## 🔧 Step 3: Update Your Website Code

### 3.1 Update index.html
Find this line in `index.html`:
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_RECAPTCHA_SITE_KEY"></script>
```

Replace `YOUR_RECAPTCHA_SITE_KEY` with your reCAPTCHA **Site Key**.

### 3.2 Update main.js
Open `main.js` and replace these placeholders:

**Line ~130** - Replace:
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
```
With:
```javascript
emailjs.init('a1b2c3d4e5f6g7h8'); // Your EmailJS Public Key
```

**Line ~128** - Replace:
```javascript
const recaptchaToken = await grecaptcha.execute('YOUR_RECAPTCHA_SITE_KEY', {action: 'submit'});
```
With:
```javascript
const recaptchaToken = await grecaptcha.execute('6LcXXXXXXXXXX', {action: 'submit'}); // Your reCAPTCHA Site Key
```

**Lines ~133-134** - Replace:
```javascript
const response = await emailjs.send(
  'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID',     // Replace with your EmailJS template ID
```
With:
```javascript
const response = await emailjs.send(
  'service_abc123',      // Your EmailJS Service ID
  'template_xyz789',     // Your EmailJS Template ID
```

---

## ✅ Step 4: Test Your Setup

1. Open your website in a browser
2. Click the chat bubble (bottom-right)
3. Fill in the form with test data
4. Click "Send Message"
5. Check your **info@9softwaresolutions.com** inbox!

---

## 📝 Example Configuration

Here's what your final code should look like:

**index.html (line ~332):**
```html
<script src="https://www.google.com/recaptcha/api.js?render=6LcExample1234567890"></script>
```

**main.js (lines ~127-138):**
```javascript
// Execute reCAPTCHA v3 verification
const recaptchaToken = await grecaptcha.execute('6LcExample1234567890', {action: 'submit'});

// Initialize EmailJS
emailjs.init('user_abc123xyz456');

// Send email using EmailJS
const response = await emailjs.send(
  'service_gmail123',
  'template_contact456',
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'info@9softwaresolutions.com',
    recaptcha_token: recaptchaToken
  }
);
```

---

## 🎉 You're Done!

Your contact form now:
- ✅ Sends real emails to **info@9softwaresolutions.com**
- ✅ Protected from spam bots with reCAPTCHA v3
- ✅ Works without any backend server
- ✅ Is completely FREE (within limits)

**Free Tier Limits:**
- EmailJS: 200 emails/month
- reCAPTCHA: Unlimited (free forever)

---

## 🆘 Troubleshooting

### Emails not sending?
1. Check browser console for errors (F12)
2. Verify all keys are correct in `index.html` and `main.js`
3. Make sure EmailJS service is connected to the right email

### Getting CORS errors?
- Add your domain in EmailJS settings under "Allowed domains"

### reCAPTCHA not loading?
- Check if your Site Key is correct in `index.html`
- Verify domain is registered in reCAPTCHA admin panel

---

## 📞 Need Help?
If you encounter issues, check:
- EmailJS Documentation: https://www.emailjs.com/docs/
- reCAPTCHA Documentation: https://developers.google.com/recaptcha/docs/v3
