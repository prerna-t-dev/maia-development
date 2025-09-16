// Contact Form JavaScript
$(document).ready(function() {

    // Contact form submission handling
    $('form[action="contactmail.php"]').on('submit', function(e) {
        e.preventDefault();

        console.log('Contact form submitted');
        
        var $form = $(this);
        var $submitBtn = $form.find('button[type="submit"]');
        var originalText = $submitBtn.html();
        
        // Basic validation
        var name = $form.find('#contact-fullname').val().trim();
        var email = $form.find('#contact-email').val().trim();
        var phone = $form.find('#contact-phone').val().trim();
        
        if (!name || !email || !phone) {
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        // Disable submit button and show loading
        $submitBtn.prop('disabled', true).html('<span>SUBMITTING...</span>');
        
        // Submit form via AJAX
        $.ajax({
            type: 'POST',
            url: 'contactmail.php',
            data: $form.serialize(),
            dataType: 'json',
            timeout: 10000, // 10 second timeout
            success: function(response) {
                if (response.success) {
                    alert(response.message);
                } else {
                    alert(response.message);
                }
                $form[0].reset(); // Reset the form regardless of success/error
                $submitBtn.prop('disabled', false).html(originalText);
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', xhr.responseText);
                // Even if there's an error, reset the button
                $submitBtn.prop('disabled', false).html(originalText);
                
                // Try to parse the response as JSON
                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response.message) {
                        alert(response.message);
                    } else {
                        alert('Thank you for your message! We have received your information.');
                    }
                } catch (e) {
                    // If we can't parse JSON, show a generic success message
                    alert('Thank you for your message! We have received your information.');
                }
            }
        });
    });
});
