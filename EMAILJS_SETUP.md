# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

## Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Follow the setup instructions
5. Note down your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** New Contact Form Submission - {{from_name}}

**Content:**
```
New contact form submission received:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Message: {{message}}

Submitted on: {{current_date}}
```

4. Save the template
5. Note down your **Template ID**

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key**

## Step 5: Update the Code
Replace these placeholders in `index.php`:
- `YOUR_PUBLIC_KEY` → Your actual public key
- `YOUR_SERVICE_ID` → Your service ID
- `YOUR_TEMPLATE_ID` → Your template ID

## Step 6: Test
1. Save the file
2. Test the contact form
3. Check your email!

## Benefits of EmailJS:
- ✅ Works without server configuration
- ✅ Free for up to 200 emails/month
- ✅ Reliable delivery
- ✅ No PHP mail issues
- ✅ Works on localhost
