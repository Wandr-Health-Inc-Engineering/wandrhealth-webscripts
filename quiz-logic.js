document.addEventListener('DOMContentLoaded', () => {
    const pages = {
        'page-1': document.getElementById('page-1'),
        'page-2': document.getElementById('page-2'),
        'page-2b': document.getElementById('page-2b'),
        'page-3': document.getElementById('page-3'),
        'page-3b': document.getElementById('page-3b'),
        'page-4': document.getElementById('page-4')
    };

    // --- UI Element References ---
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const startButton = document.getElementById('start-button');
    const orderKitButton = document.getElementById('order-kit-button');

    const countrySelect = document.getElementById('country-select');
    const durationInput = document.getElementById('duration-input');
    const durationMinus = document.getElementById('duration-minus');
    const durationPlus = document.getElementById('duration-plus');
    const altitudeOptions = document.querySelectorAll('#page-3 .altitude-option');
    const medicationList = document.getElementById('medication-list');
    const medicationTotalPriceEl = document.getElementById('medication-total-price');
    const countryNameEl = document.getElementById('country-name');
    const riskLevelEl = document.getElementById('risk-level');
    const countryDescriptionEl = document.getElementById('country-description');
    const malariaAlertEl = document.getElementById('malaria-alert');
    const savingsAmountEl = document.getElementById('savings-amount');
    const individualMedsButton = document.getElementById('individual-meds-button');
    const recommendedKitSection = document.getElementById('recommended-kit-summary');
    const individualMedsSection = document.getElementById('individual-meds-selection');
    const individualMedsList = document.getElementById('individual-meds-list');
    const individualMedsTotalPriceEl = document.getElementById('individual-meds-total-price');
    const checkoutIndividualMedsButton = document.getElementById('checkout-individual-meds-button');
    const recommendedMedsListContainer = document.getElementById('medication-list-recommended');
    const malariaOptions = document.querySelectorAll('#page-2b .malaria-option');
    const medsListColumn = document.getElementById('meds-list-column');
    const priceSummaryColumn = document.getElementById('price-summary-column');
    const changeCountryLink = document.getElementById('change-country-link');


    // --- State Variables and Constants ---
    let malariaProphylaxisSelection = null;
    let altitudeSicknessSelection = null;
    let finalRecommendedMeds = [];

    const totalSteps = 4;
    const kitPrice = 249.00;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const comprehensiveKitVariantId = "44633630081077";

    // Medications array
    const medications = [
        { name: "Azithromycin", price: 69.00, quantity: "One Treatment", group: "diarrhea", risk: ['medium', 'high'], variantId: "44633631424565", ailment: "Traveler's Diarrhea (Antibiotic)" },
        { name: "Ciprofloxacin", price: 99.00, quantity: "One Treatment", group: "diarrhea-alt", risk: ['medium', 'high'], variantId: "44633631064117", ailment: "Traveler's Diarrhea (Alternative Antibiotic)" },
        { name: "Atovaquone-Proguanil", price: 159.00, quantity: "Up to 60 Travel Days", group: "malaria", risk: ['high'], variantId: "44633629589557", ailment: "Malaria Prevention" },
        { name: "Acetazolamide", price: 79.00, quantity: "Up to 60 Travel Days", group: "altitude", risk: ['altitude'], variantId: "44633631162421", ailment: "Altitude Sickness Prevention" },
        { name: "Ondansetron", price: 69.00, quantity: "30 Tablets", group: "nausea", risk: ['low', 'medium', 'high'], variantId: "44633444122677", ailment: "Nausea/Vomiting" },
        { name: "Dicyclomine", price: 99.00, quantity: "30 Tablets", group: "cramps", risk: ['low', 'medium', 'high'], variantId: "44633625034805", ailment: "Stomach Cramps" },
        { name: "Hydroxyzine", price: 69.00, quantity: "30 Tablets", group: "anxiety", risk: ['low', 'medium', 'high'], variantId: "44633538658357", ailment: "Anxiety/Sleep Aid" },
        { name: "Meclizine", price: 69.00, quantity: "30 Tablets", group: "motion-sickness", risk: ['low', 'medium', 'high'], variantId: "44633626476597", ailment: "Motion Sickness" },
        { name: "Scopolamine", price: 89.00, quantity: "3 patches", group: "motion-sickness-alt", risk: ['low', 'medium', 'high'], variantId: "44698644512821", ailment: "Motion Sickness (Patch)" },
        { name: "Clotrimazole-Betamethasone", price: 79.00, quantity: "45g Tube", group: "skin", risk: ['low', 'medium', 'high'], variantId: "44633626411061", ailment: "Fungal/Inflammation Cream" },
        { name: "Ibuprofen", price: 49.00, quantity: "30 Tablets", group: "pain", risk: ['low', 'medium', 'high'], variantId: "44633627557941", ailment: "Pain/Fever Relief" },
    ];
    
    // Country data and malaria/altitude sets
    const countries = [
        { value: 'Afghanistan', name: 'Afghanistan', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Albania', name: 'Albania', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Algeria', name: 'Algeria', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Andorra', name: 'Andorra', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Angola', name: 'Angola', code: '', riskLevel: 'high', description: 'A high-risk destination with potential for malaria and other vector-borne diseases. A comprehensive kit with strong antibiotics and malaria prevention is essential.' },
        { value: 'Antigua and Barbuda', name: 'Antigua and Barbuda', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Argentina', name: 'Argentina', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Armenia', name: 'Armenia', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Australia', name: 'Australia', code: 'au', riskLevel: 'low', description: 'A low-risk destination with excellent healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Austria', name: 'Austria', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Azerbaijan', name: 'Azerbaijan', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Bahamas', name: 'Bahamas', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Bahrain', name: 'Bahrain', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Bangladesh', name: 'Bangladesh', code: '', riskLevel: 'high', description: 'A high-risk destination. Our comprehensive kit is essential for staying healthy in a diverse and challenging environment.' },
        { value: 'Barbados', name: 'Barbados', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Belarus', name: 'Belarus', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Belgium', name: 'Belgium', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Belize', name: 'Belize', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Benin', name: 'Benin', code: '', riskLevel: 'high', description: 'A high-risk destination with potential for malaria and other vector-borne diseases. A comprehensive kit with strong antibiotics and malaria prevention is essential.' },
        { value: 'Bhutan', name: 'Bhutan', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the tropical environment can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Bolivia', name: 'Bolivia', code: '', riskLevel: 'high', description: 'A high-risk destination, especially if traveling to high altitudes or remote jungle areas. This kit is tailored for travelers who need to be prepared for various risks.' },
        { value: 'Bosnia and Herzegovina', name: 'Bosnia and Herzegovina', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Botswana', name: 'Botswana', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Brazil', name: 'Brazil', code: 'br', riskLevel: 'high', description: 'A high-risk destination with potential for malaria and other vector-borne diseases. A comprehensive kit with strong antibiotics and malaria prevention is essential.' },
        { value: 'Brunei', name: 'Brunei', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Bulgaria', name: 'Bulgaria', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Burkina Faso', name: 'Burkina Faso', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Burundi', name: 'Burundi', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Cabo Verde', name: 'Cabo Verde', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Cambodia', name: 'Cambodia', code: '', riskLevel: 'high', description: 'A high-risk destination. Travel in remote areas or during certain seasons can increase the risk of infectious diseases. A robust medical kit is a must.' },
        { value: 'Cameroon', name: 'Cameroon', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Canada', name: 'Canada', code: 'ca', riskLevel: 'low', description: 'A low-risk destination. While medical care is readily available, a personal medical kit is crucial for pain, allergies, and general wellness on the road.' },
        { value: 'Central African Republic', name: 'Central African Republic', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Chad', name: 'Chad', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Chile', name: 'Chile', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'China', name: 'China', code: '', riskLevel: 'medium', description: 'A medium-risk destination where hygiene and food safety can vary. A kit with medication for traveler\'s diarrhea is highly recommended.' },
        { value: 'Colombia', name: 'Colombia', code: '', riskLevel: 'high', description: 'A high-risk destination. Our comprehensive kit is essential for staying healthy in a diverse and challenging environment.' },
        { value: 'Comoros', name: 'Comoros', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Congo, Democratic Republic of the', name: 'Congo, Democratic Republic of the', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Congo, Republic of the', name: 'Congo, Republic of the', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Costa Rica', name: 'Costa Rica', code: 'cr', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the tropical environment can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Cote d\'Ivoire', name: 'Cote d\'Ivoire', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Croatia', name: 'Croatia', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Cuba', name: 'Cuba', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Cyprus', name: 'Cyprus', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Czech Republic', name: 'Czech Republic', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Denmark', name: 'Denmark', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Djibouti', name: 'Djibouti', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Dominica', name: 'Dominica', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Dominican Republic', name: 'Dominican Republic', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Ecuador', name: 'Ecuador', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Egypt', name: 'Egypt', code: 'eg', riskLevel: 'medium', description: 'A medium-risk destination where hygiene and food safety can vary. A kit with medication for traveler\'s diarrhea is highly recommended.' },
        { value: 'El Salvador', name: 'El Salvador', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Equatorial Guinea', name: 'Equatorial Guinea', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Eritrea', name: 'Eritrea', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Eswatini', name: 'Eswatini', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Ethiopia', name: 'Ethiopia', code: '', riskLevel: 'high', description: 'A high-risk destination. Our comprehensive kit is essential for staying healthy in a diverse and challenging environment.' },
        { value: 'Fiji', name: 'Fiji', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Finland', name: 'Finland', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'France', name: 'France', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Gabon', name: 'Gabon', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Gambia', name: 'Gambia', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Georgia', name: 'Georgia', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Germany', name: 'Germany', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Ghana', name: 'Ghana', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Greece', name: 'Greece', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Grenada', name: 'Grenada', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Guatemala', name: 'Guatemala', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Guinea', name: 'Guinea', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Guinea-Bissau', name: 'Guinea-Bissau', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Guyana', name: 'Guyana', code: '', riskLevel: 'high', description: 'A high-risk destination. Our comprehensive kit is essential for staying healthy in a diverse and challenging environment.' },
        { value: 'Haiti', name: 'Haiti', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Honduras', name: 'Honduras', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Hungary', name: 'Hungary', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Iceland', name: 'Iceland', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'India', name: 'India', code: 'in', riskLevel: 'high', description: 'A high-risk destination. Our comprehensive kit is essential for staying healthy in a diverse and challenging environment.' },
        { value: 'Indonesia', name: 'Indonesia', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the tropical environment can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Iran', name: 'Iran', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Iraq', name: 'Iraq', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Ireland', name: 'Ireland', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Israel', name: 'Israel', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Italy', name: 'Italy', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Jamaica', name: 'Jamaica', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Japan', name: 'Japan', code: 'jp', riskLevel: 'low', description: 'A low-risk destination with a very high standard of medical care. A basic kit provides peace of mind for common issues.' },
        { value: 'Jordan', name: 'Jordan', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Kazakhstan', name: 'Kazakhstan', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Kenya', name: 'Kenya', code: 'ke', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Kiribati', name: 'Kiribati', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Korea, North', name: 'Korea, North', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Korea, South', name: 'Korea, South', code: '', riskLevel: 'low', description: 'A low-risk destination with a very high standard of medical care. A basic kit provides peace of mind for common issues.' },
        { value: 'Kuwait', name: 'Kuwait', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Kyrgyzstan', name: 'Kyrgyzstan', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Laos', name: 'Laos', code: '', riskLevel: 'high', description: 'A high-risk destination. Travel in remote areas or during certain seasons can increase the risk of infectious diseases. A robust medical kit is a must.' },
        { value: 'Latvia', name: 'Latvia', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Lebanon', name: 'Lebanon', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Lesotho', name: 'Lesotho', code: '', riskLevel: 'high', description: 'A high-risk destination. Our comprehensive kit is essential for staying healthy in a diverse and challenging environment.' },
        { value: 'Liberia', name: 'Liberia', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Libya', name: 'Libya', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Liechtenstein', name: 'Liechtenstein', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Lithuania', name: 'Lithuania', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Luxembourg', name: 'Luxembourg', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Madagascar', name: 'Madagascar', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Malawi', name: 'Malawi', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Malaysia', name: 'Malaysia', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the tropical environment can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Maldives', name: 'Maldives', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Mali', name: 'Mali', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Malta', name: 'Malta', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Marshall Islands', name: 'Marshall Islands', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Mauritania', name: 'Mauritania', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Mauritius', name: 'Mauritius', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Mexico', name: 'Mexico', code: 'mx', riskLevel: 'medium', description: 'A medium-risk destination where food and water safety can be a concern. It\'s highly recommended to carry prescription medication for Traveler\'s Diarrhea and other common illnesses.' },
        { value: 'Micronesia', name: 'Micronesia', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Moldova', name: 'Moldova', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Monaco', name: 'Monaco', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Mongolia', name: 'Mongolia', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Montenegro', name: 'Montenegro', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Morocco', name: 'Morocco', code: 'ma', riskLevel: 'medium', description: 'A medium-risk destination where food and water can present a risk of illness. Be prepared with an antibiotic and other key medications.' },
        { value: 'Mozambique', name: 'Mozambique', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Myanmar (Burma)', name: 'Myanmar (Burma)', code: '', riskLevel: 'high', description: 'A high-risk destination. Travel in remote areas or during certain seasons can increase the risk of infectious diseases. A robust medical kit is a must.' },
        { value: 'Namibia', name: 'Namibia', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Nauru', name: 'Nauru', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Nepal', name: 'Nepal', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Netherlands', name: 'Netherlands', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'New Zealand', name: 'New Zealand', code: '', riskLevel: 'low', description: 'A low-risk destination with excellent healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Nicaragua', name: 'Nicaragua', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Niger', name: 'Niger', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Nigeria', name: 'Nigeria', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'North Macedonia', name: 'North Macedonia', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Norway', name: 'Norway', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Oman', name: 'Oman', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Pakistan', name: 'Pakistan', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Palau', name: 'Palau', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Panama', name: 'Panama', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Papua New Guinea', name: 'Papua New Guinea', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Paraguay', name: 'Paraguay', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Peru', name: 'Peru', code: 'pe', riskLevel: 'high', description: 'A high-risk destination, especially if traveling to high altitudes or remote jungle areas. This kit is tailored for travelers who need to be prepared for various risks.' },
        { value: 'Philippines', name: 'Philippines', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the tropical environment can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Poland', name: 'Poland', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Portugal', name: 'Portugal', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Qatar', name: 'Qatar', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Romania', name: 'Romania', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Russia', name: 'Russia', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Rwanda', name: 'Rwanda', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Saint Kitts and Nevis', name: 'Saint Kitts and Nevis', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Saint Lucia', name: 'Saint Lucia', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Saint Vincent and the Grenadines', name: 'Saint Vincent and the Grenadines', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Samoa', name: 'Samoa', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'San Marino', name: 'San Marino', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Sao Tome and Principe', name: 'Sao Tome and Principe', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Saudi Arabia', name: 'Saudi Arabia', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Senegal', name: 'Senegal', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Serbia', name: 'Serbia', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Seychelles', name: 'Seychelles', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Sierra Leone', name: 'Sierra Leone', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Singapore', name: 'Singapore', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Slovakia', name: 'Slovakia', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Slovenia', name: 'Slovenia', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Solomon Islands', name: 'Solomon Islands', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the tropical environment can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Somalia', name: 'Somalia', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'South Africa', name: 'South Africa', code: '', riskLevel: 'medium', description: 'A medium-risk destination where food and water can present a risk of illness. Be prepared with an antibiotic and other key medications.' },
        { value: 'South Sudan', name: 'South Sudan', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Spain', name: 'Spain', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Sri Lanka', name: 'Sri Lanka', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the tropical environment can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Sudan', name: 'Sudan', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Suriname', name: 'Suriname', code: '', riskLevel: 'high', description: 'A high-risk destination. Our comprehensive kit is essential for staying healthy in a diverse and challenging environment.' },
        { value: 'Sweden', name: 'Sweden', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Switzerland', name: 'Switzerland', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Syria', name: 'Syria', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Taiwan', name: 'Taiwan', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Tajikistan', name: 'Tajikistan', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Tanzania', name: 'Tanzania', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Thailand', name: 'Thailand', code: 'th', riskLevel: 'high', description: 'A high-risk destination. Travel in remote areas or during certain seasons can increase the risk of infectious diseases. A robust medical kit is a must.' },
        { value: 'Timor-Leste', name: 'Timor-Leste', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Togo', name: 'Togo', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Tonga', name: 'Tonga', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Trinidad and Tobago', name: 'Trinidad and Tobago', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Tunisia', name: 'Tunisia', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Turkey', name: 'Turkey', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Turkmenistan', name: 'Turkmenistan', code: '', riskLevel: 'medium', description: 'A medium-risk destination. Be prepared for food and water safety concerns. A kit with medication for traveler\'s diarrhea is recommended.' },
        { value: 'Tuvalu', name: 'Tuvalu', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Uganda', name: 'Uganda', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Ukraine', name: 'Ukraine', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'United Arab Emirates', name: 'United Arab Emirates', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'United Kingdom', name: 'United Kingdom', code: 'gb', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'United States', name: 'United States', code: 'us', riskLevel: 'low', description: 'Domestic travel in the United States generally carries a low risk for exotic diseases, but it\'s always smart to be prepared for common ailments like pain, allergies, and nausea.' },
        { value: 'Uruguay', name: 'Uruguay', code: '', riskLevel: 'low', description: 'A low-risk destination. While medical care is available, a personal medical kit is helpful for common ailments.' },
        { value: 'Uzbekistan', name: 'Uzbekistan', code: '', riskLevel: 'medium', description: 'A medium-risk destination. While generally safe, the region can present risks of traveler\'s diarrhea and other infections. This kit will help you stay healthy.' },
        { value: 'Vanuatu', name: 'Vanuatu', code: '', riskLevel: 'low', description: 'A low-risk destination with good healthcare. A basic kit is useful for common ailments and minor injuries you may encounter during your trip.' },
        { value: 'Vatican City', name: 'Vatican City', code: '', riskLevel: 'low', description: 'A low-risk destination with high-quality medical facilities. A basic travel kit will cover common issues and minor emergencies.' },
        { value: 'Venezuela', name: 'Venezuela', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Vietnam', name: 'Vietnam', code: '', riskLevel: 'high', description: 'A high-risk destination. Travel in remote areas or during certain seasons can increase the risk of infectious diseases. A robust medical kit is a must.' },
        { value: 'Yemen', name: 'Yemen', code: '', riskLevel: 'high', description: 'A high-risk destination with complex health considerations. A comprehensive medical kit is essential for staying healthy and prepared.' },
        { value: 'Zambia', name: 'Zambia', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
        { value: 'Zimbabwe', name: 'Zimbabwe', code: '', riskLevel: 'high', description: 'A high-risk destination with a significant risk of malaria. Our high-risk kit is designed to provide comprehensive protection against common and serious travel illnesses.' },
    ];

    const malariaEndemicCountries = [
        'Afghanistan', 'Angola', 'Benin', 'Bolivia', 'Botswana', 'Brazil', 'Burkina Faso', 'Burundi',
        'Cambodia', 'Cameroon', 'Central African Republic', 'Chad', 'Colombia', 'Comoros',
        'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Cote d\'Ivoire', 'Djibouti',
        'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea',
        'Guinea-Bissau', 'Guyana', 'Haiti', 'India', 'Iraq', 'Kenya', 'Laos', 'Lesotho', 'Liberia',
        'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mozambique', 'Myanmar (Burma)', 'Namibia',
        'Niger', 'Nigeria', 'Pakistan', 'Papua New Guinea', 'Peru', 'Rwanda',
        'Sao Tome and Principe', 'Senegal', 'Sierra Leone', 'Somalia', 'South Sudan', 'Sudan',
        'Suriname', 'Syria', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Uganda', 'Venezuela',
        'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ];

    const altitudeSicknessCountries = new Set(['Argentina', 'Bolivia', 'Bhutan', 'Chile', 'China', 'Colombia', 'Ecuador', 'Ethiopia', 'India', 'Kenya', 'Kyrgyzstan', 'Nepal', 'Peru', 'Rwanda', 'Tanzania', 'Uganda']);
    
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });
    
    const allergySelectOptions = medications.map(med => med.name).sort();
    allergySelectOptions.push("Other");


    const updateProgressBar = (step) => {
        const progressBar = document.getElementById('progressBar');
        const percentage = (step / totalSteps) * 100;
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
    };

    const renderAllergyOptions = () => {
        const allergyGridContainer = document.getElementById('allergy-options-grid-container');
        const noAllergyOption = document.getElementById('no-allergy-option');
        
        allergyGridContainer.innerHTML = '';
        
        // Add individual allergy options to the grid container
        allergySelectOptions.forEach(name => {
            const option = document.createElement('div');
            option.className = 'allergy-option'; 
            option.dataset.allergy = name;
            option.textContent = name;
            allergyGridContainer.appendChild(option);
        });

        // --- Event Listeners for new structure ---
        
        // 1. Logic for "No known allergies" button
        noAllergyOption.addEventListener('click', () => {
            // Deselect all pills in the grid
            allergyGridContainer.querySelectorAll('.allergy-option').forEach(opt => opt.classList.remove('selected'));
            // Select the full-width button
            noAllergyOption.classList.add('selected');
        });
        
        // 2. Logic for all other allergy pills
        allergyGridContainer.querySelectorAll('.allergy-option').forEach(option => {
            option.addEventListener('click', () => {
                // Deselect "No known allergies" if another is clicked
                noAllergyOption.classList.remove('selected');
                option.classList.toggle('selected');
                
                // If no pills are selected, re-select "No known allergies"
                const selectedCount = Array.from(allergyGridContainer.querySelectorAll('.allergy-option.selected')).length;
                if (selectedCount === 0) {
                    noAllergyOption.classList.add('selected');
                }
            });
        });
    };

    const saveUserInfo = () => {
        const userInfo = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim()
        };
        localStorage.setItem('wandrUserInfo', JSON.stringify(userInfo));
    };

    const loadUserInfo = () => {
        const userInfo = JSON.parse(localStorage.getItem('wandrUserInfo'));
        if (userInfo) {
            firstNameInput.value = userInfo.firstName;
            lastNameInput.value = userInfo.lastName;
            emailInput.value = userInfo.email;
            phoneInput.value = userInfo.phone;
        }
    };
    
    const showPage = (pageId) => {
        Object.values(pages).forEach(page => page.style.display = 'none');
        pages[pageId].style.display = 'block';

        const stepMap = { 'page-1': 1, 'page-2': 2, 'page-2b': 2, 'page-3': 3, 'page-3b': 3, 'page-4': 4 };
        updateProgressBar(stepMap[pageId]);
    };

    const validatePage1 = () => {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        const inputs = [firstNameInput, lastNameInput, emailInput, phoneInput];
        inputs.forEach(input => input.classList.remove('error-border'));
        
        let isValid = true;

        if (!firstName) {
            firstNameInput.classList.add('error-border');
            isValid = false;
        }
        if (!lastName) {
            lastNameInput.classList.add('error-border');
            isValid = false;
        }
        if (!email || !emailRegex.test(email)) {
            emailInput.classList.add('error-border');
            isValid = false;
        }
        if (!phone || !phoneRegex.test(phone)) {
            phoneInput.classList.add('error-border');
            isValid = false;
        }
        
        return isValid;
    };
    
    const renderMedicationList = () => {
        const selectedCountry = countrySelect.value;
        const destinationData = countries.find(c => c.name === selectedCountry);
        const destinationRisk = destinationData?.riskLevel;
        const isMalariaEndemic = malariaEndemicCountries.includes(selectedCountry);
        const isHighAltitude = altitudeSicknessSelection === 'yes' || (altitudeSicknessCountries.has(selectedCountry) && altitudeSicknessSelection !== 'no');
        const selectedAllergies = Array.from(document.querySelectorAll('#page-3b .allergy-option.selected')).map(el => el.dataset.allergy).filter(a => a !== 'none');

        let recommendedMeds = [];
        let totalMedPrice = 0;
        
        // Helper to get full med details
        const getMedDetails = (group) => medications.find(m => m.group === group);
        
        // --- Step 1: Define the Base Kit ---
        let baseKitMeds = [
            getMedDetails("diarrhea"),
            getMedDetails("nausea"),
            getMedDetails("cramps"),
            getMedDetails("anxiety"),
            getMedDetails("motion-sickness"),
            getMedDetails("skin"),
            getMedDetails("pain")
        ].filter(med => med !== undefined); 

        // --- Step 2: Apply Conditional Meds (Malaria & Altitude) ---
        
        // Malaria Logic
        if (isMalariaEndemic && malariaProphylaxisSelection === 'yes') {
            const malariaMed = getMedDetails('malaria');
            if (malariaMed) {
                 baseKitMeds.push(malariaMed);
            }
        }
        // Altitude Logic
        if (isHighAltitude) {
            const altitudeMed = getMedDetails('altitude');
            if (altitudeMed) {
                baseKitMeds.push(altitudeMed);
            }
        }
        
        // --- Step 3: Apply Allergy Overrides ---
        
        recommendedMeds = baseKitMeds;

        // 3a. Check for Meclizine allergy (swap with Scopolamine)
        if (selectedAllergies.includes("Meclizine")) {
            const meclizineIndex = recommendedMeds.findIndex(m => m.group === 'motion-sickness');
            if (meclizineIndex !== -1) {
                recommendedMeds.splice(meclizineIndex, 1);
                const scopolamine = getMedDetails('motion-sickness-alt');
                // Check if the replacement med is also an allergy
                if (scopolamine && !selectedAllergies.includes(scopolamine.name)) {
                     recommendedMeds.push(scopolamine);
                }
            }
        }

        // 3b. Check for Azithromycin allergy (swap with Ciprofloxacin)
        if (selectedAllergies.includes("Azithromycin")) {
            const azithromycinIndex = recommendedMeds.findIndex(m => m.group === 'diarrhea');
            if (azithromycinIndex !== -1) {
                recommendedMeds.splice(azithromycinIndex, 1);
                const ciprofloxacin = getMedDetails('diarrhea-alt');
                // Check if the replacement med is also an allergy
                if (ciprofloxacin && !selectedAllergies.includes(ciprofloxacin.name)) {
                     recommendedMeds.push(ciprofloxacin);
                }
            }
        }

        // 3c. Filter out any remaining allergic medications
        recommendedMeds = recommendedMeds.filter(med => !selectedAllergies.includes(med.name));

        // --- Final Render and Calculation ---
        
        finalRecommendedMeds = recommendedMeds;

        medicationList.innerHTML = '';
        totalMedPrice = 0;

        // Update Country Info
        countryNameEl.textContent = destinationData.name;
        riskLevelEl.textContent = destinationRisk.charAt(0).toUpperCase() + destinationRisk.slice(1);
        countryDescriptionEl.textContent = destinationData.description;

        // Update Malaria Alert
        if (isMalariaEndemic && malariaProphylaxisSelection === 'yes') {
            malariaAlertEl.style.display = 'block';
            malariaAlertEl.textContent = `${destinationData.name} is a malaria endemic area. We have included medication that is essential you take daily to prevent malaria.`;
        } else {
            malariaAlertEl.style.display = 'none';
        }

        // Render Medication List and Calculate Total
        finalRecommendedMeds.forEach(med => {
            const div = document.createElement('div');
            div.className = 'medication-item';
            div.innerHTML = `
                <div>
                    <span class="med-name">${med.name} - ${med.ailment}</span>
                    <span class="med-details">${med.quantity}</span>
                </div>
                <span>$${med.price.toFixed(2)}</span>
            `;
            medicationList.appendChild(div);
            totalMedPrice += med.price;
        });
        
        const savings = totalMedPrice - kitPrice;
        const savingsPercentage = totalMedPrice > 0 ? ((savings / totalMedPrice) * 100).toFixed(0) : 0;
        
        savingsAmountEl.textContent = `$${savings.toFixed(2)} (${savingsPercentage}% cheaper)`;
        medicationTotalPriceEl.textContent = `$${totalMedPrice.toFixed(2)}`;
    };

    const renderIndividualMeds = () => {
        individualMedsList.innerHTML = '';
        
        medsListColumn.classList.add('full-width');
        priceSummaryColumn.style.display = 'none';

        // Render with Ailment and Quantity subtext for selection pills
        finalRecommendedMeds.forEach(med => {
            const div = document.createElement('div');
            
            div.innerHTML = `
                <div class="medication-card" data-variant-id="${med.variantId}" data-price="${med.price}">
                    <div>
                        <h6 style="font-weight: 500;">${med.name} - ${med.ailment}</h6>
                        <span class="med-details" style="font-weight: 500; text-align: left;">${med.quantity}</span> 
                    </div>
                    <span>$${med.price.toFixed(2)}</span>
                </div>
            `;
            individualMedsList.appendChild(div);

            const card = div.querySelector('.medication-card');
            card.addEventListener('click', () => {
                card.classList.toggle('selected');
                updateIndividualMedsTotal();
            });
        });
        updateIndividualMedsTotal();
    };

    const updateIndividualMedsTotal = () => {
        let total = 0;
        individualMedsList.querySelectorAll('.medication-card.selected').forEach(card => {
            total += parseFloat(card.dataset.price);
        });
        individualMedsTotalPriceEl.textContent = `$${total.toFixed(2)}`;
        checkoutIndividualMedsButton.disabled = total === 0;
    };

    const generateIndividualCheckoutUrl = () => {
        const userInfo = JSON.parse(localStorage.getItem('wandrUserInfo'));
        if (!userInfo) {
            alert("User info not found. Please go back to the first page and try again.");
            return null;
        }
        
        const selectedMeds = Array.from(individualMedsList.querySelectorAll('.medication-card.selected'));

        if (selectedMeds.length === 0) {
            alert("Please select at least one medication to proceed to checkout.");
            return null;
        }

        const lineItems = selectedMeds.map(card => `${card.dataset.variantId}:1`).join(',');

        // You might need to adjust the domain if this is a development store.
        const url = `https://b0y2qj-6r.myshopify.com/cart/${lineItems}?checkout[email]=${encodeURIComponent(userInfo.email)}&checkout[shipping_address][first_name]=${encodeURIComponent(userInfo.firstName)}&checkout[shipping_address][last_name]=${encodeURIComponent(userInfo.lastName)}&checkout[shipping_address][phone]=${encodeURIComponent(userInfo.phone)}`;
        
        return url;
    };

    // --- CORE INITIALIZATION & EVENT ATTACHMENTS ---
    
    loadUserInfo();
    updateProgressBar(1);
    renderAllergyOptions();
    
    startButton.addEventListener('click', () => {
        if (validatePage1()) {
            saveUserInfo();
            showPage('page-2');
        } else {
            alert("Please fill out all required fields to continue.");
        }
    });
    
    document.getElementById('page-1').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startButton.click();
        }
    });


    document.querySelector('[data-action="next-from-p2"]').addEventListener('click', () => {
        if (countrySelect.value === '' || countrySelect.value === 'Select a Country') {
            alert("Please select a country to continue.");
            countrySelect.classList.add('error-border');
            return;
        }
        countrySelect.classList.remove('error-border');
        const selectedCountry = countrySelect.value;
        if (malariaEndemicCountries.includes(selectedCountry)) {
            showPage('page-2b');
        } else {
            malariaProphylaxisSelection = 'no';
            showPage('page-3');
        }
    });

    document.querySelector('[data-action="next-from-p2b"]').addEventListener('click', () => {
        if (!malariaProphylaxisSelection) {
            alert("Please select an option to continue.");
            return;
        }
        showPage('page-3');
    });

    document.querySelector('[data-action="next-from-p3"]').addEventListener('click', () => {
         if (!altitudeSicknessSelection) {
            alert("Please select an option to continue.");
            return;
        }
        showPage('page-3b');
    });

    malariaOptions.forEach(option => {
        option.addEventListener('click', () => {
            malariaOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            malariaProphylaxisSelection = option.dataset.selection;
        });
    });

    altitudeOptions.forEach(option => {
        option.addEventListener('click', () => {
            altitudeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            altitudeSicknessSelection = option.dataset.selection;
        });
    });

    document.querySelector('[data-action="get-results"]').addEventListener('click', () => {
        renderMedicationList();
        showPage('page-4');
        // Ensure recommended kit is shown by default on results
        recommendedMedsListContainer.style.display = 'block';
        recommendedKitSection.style.display = 'block';
        individualMedsSection.style.display = 'none';

        medsListColumn.classList.remove('full-width');
        priceSummaryColumn.style.display = 'block';
    });

    orderKitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('wandrUserInfo'));
        if (!userInfo) {
            alert("User info not found. Please go back to the first page and try again.");
            return;
        }
        
        const checkoutUrl = `https://b0y2qj-6r.myshopify.com/cart/${comprehensiveKitVariantId}:1?checkout[email]=${encodeURIComponent(userInfo.email)}&checkout[shipping_address][first_name]=${encodeURIComponent(userInfo.firstName)}&checkout[shipping_address][last_name]=${encodeURIComponent(userInfo.lastName)}&checkout[shipping_address][phone]=${encodeURIComponent(userInfo.phone)}`;
        
        window.location.href = checkoutUrl;
    });
    
    individualMedsButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Switch to individual selection view
        recommendedMedsListContainer.style.display = 'none';
        recommendedKitSection.style.display = 'none';
        individualMedsSection.style.display = 'block';
        
        medsListColumn.classList.add('full-width');
        priceSummaryColumn.style.display = 'none';

        renderIndividualMeds();
    });

    checkoutIndividualMedsButton.addEventListener('click', (e) => {
        e.preventDefault();
        const checkoutUrl = generateIndividualCheckoutUrl();
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        }
    });

    document.querySelector('[data-action="back-to-recommended-kit"]').addEventListener('click', () => {
        // Switch back to recommended kit view
        individualMedsSection.style.display = 'none';
        recommendedMedsListContainer.style.display = 'block';
        recommendedKitSection.style.display = 'block';
        
        medsListColumn.classList.remove('full-width');
        priceSummaryColumn.style.display = 'block';
    });

    document.querySelector('[data-action="back-to-p1"]').addEventListener('click', () => showPage('page-1'));
    document.querySelector('[data-action="back-to-p2"]').addEventListener('click', () => showPage('page-2'));
    document.querySelector('[data-action="back-to-p2b"]').addEventListener('click', () => {
        const selectedCountry = countrySelect.value;
        if (malariaEndemicCountries.includes(selectedCountry)) {
            showPage('page-2b');
        } else {
            showPage('page-2');
        }
    });
    document.querySelector('[data-action="back-to-p3"]').addEventListener('click', () => showPage('page-3'));

    changeCountryLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('page-2');
    });
    
    durationMinus.addEventListener('click', () => {
        const currentVal = parseInt(durationInput.value);
        if (currentVal > 1) {
            durationInput.value = currentVal - 1;
        }
    });

    durationPlus.addEventListener('click', () => {
        const currentVal = parseInt(durationInput.value);
        durationInput.value = currentVal + 1;
    });
    
}); // <-- This closing brace is essential!