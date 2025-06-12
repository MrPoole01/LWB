# Embedding Lead Capture Form in Squarespace

## Step 1: Host Your Widget Files

You need to host the generated JavaScript and CSS files somewhere accessible. Here are your options:

### Option A: Use GitHub Pages (Free & Easy)
1. Create a new repository on GitHub called `lw-builders-widget`
2. Upload these files to the repository:
   - `dist/embed.js`
   - `dist/assets/index-d4JxkTA9.css`
   - `dist/assets/index--h19XiO6.js`
3. Enable GitHub Pages in repository settings
4. Your files will be available at: `https://yourusername.github.io/lw-builders-widget/`

### Option B: Use Your Render Backend (Recommended)
Since you already have Render hosting your backend, you can serve the widget files from there:

1. Copy the `dist/` folder contents to your `server/public/widget/` directory
2. Your files will be available at: `https://your-render-app.onrender.com/widget/`

## Step 2: Update Widget URLs

After hosting, you'll have these URLs:
- CSS: `https://your-domain.com/assets/index-d4JxkTA9.css`
- Main JS: `https://your-domain.com/assets/index--h19XiO6.js`
- Widget JS: `https://your-domain.com/embed.js`

## Step 3: Add to Squarespace

### Method 1: Code Injection (Site-wide)
1. Go to Squarespace Settings → Advanced → Code Injection
2. Add this to the **Header**:
```html
<link rel="stylesheet" href="https://your-domain.com/assets/index-d4JxkTA9.css">
```

3. Add this to the **Footer**:
```html
<script src="https://your-domain.com/assets/index--h19XiO6.js"></script>
<script src="https://your-domain.com/embed.js"></script>
```

### Method 2: Page-specific Code Block (Recommended)
1. Edit the page where you want the form
2. Add a **Code Block**
3. Paste this code:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://your-domain.com/assets/index-d4JxkTA9.css">

<!-- Container for the widget -->
<div id="lead-capture-widget" style="width: 100%; min-height: 600px;"></div>

<!-- JavaScript -->
<script src="https://your-domain.com/assets/index--h19XiO6.js"></script>
<script src="https://your-domain.com/embed.js"></script>

<!-- Initialize the widget -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    if (typeof initLeadCaptureWidget === 'function') {
        initLeadCaptureWidget('lead-capture-widget');
    }
});
</script>
```

## Step 4: Environment Variables

Make sure your widget can reach your Render backend. The widget will use:
- API URL: `https://your-render-app.onrender.com/api`

If you need to change this, update the `VITE_API_URL` in your build process.

## Step 5: Test

1. Publish your Squarespace page
2. Visit the page and test the form submission
3. Check that emails are being sent correctly

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure your Render backend allows requests from your Squarespace domain
2. **CSS Not Loading**: Check that the CSS file URL is accessible
3. **Widget Not Appearing**: Check browser console for JavaScript errors

### Debug Steps:
1. Open browser developer tools
2. Check Console tab for errors
3. Check Network tab to see if files are loading
4. Verify the `lead-capture-widget` div exists on the page

## Customization

To customize the widget appearance for Squarespace:
1. Modify the `EmbeddableLeadForm.tsx` component
2. Rebuild with `npm run build`
3. Upload the new files to your hosting location

## Security Notes

- The widget will submit forms to your Render backend
- Make sure your backend has proper CORS configuration
- Consider adding rate limiting to prevent spam
- Validate all form inputs on the backend 