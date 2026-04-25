import type { Service } from "./services";

export interface FAQ {
    question: string;
    answer: string;
}

const lashesExtensionsFaqs: FAQ[] = [
    {
        question: "How long do lash extensions last?",
        answer: "Lash extensions typically last between 4 and 6 weeks, shedding naturally with your lash growth cycle. To maintain a full look, we recommend booking a fill every 2 to 3 weeks.",
    },
    {
        question: "Are lash extensions safe for my natural lashes?",
        answer: "Yes — when applied by a trained lash artist using the correct length, weight, and isolation technique, extensions are safe for your natural lashes. We assess your natural lashes at every appointment to ensure we're not compromising their health.",
    },
    {
        question: "Can I wear makeup with lash extensions?",
        answer: "Yes, but avoid oil-based products and waterproof mascara around the eyes, as oil breaks down lash adhesive. We recommend a lash-extension-safe foam cleanser to clean your lashes daily.",
    },
    {
        question: "How should I prepare for my lash appointment?",
        answer: "Arrive with clean, makeup-free eyes. Avoid caffeine before your appointment if you're prone to fluttering eyes, and skip eye cream or oil-based skincare on the day of your service.",
    },
    {
        question: "Do you take fills from other lash artists?",
        answer: "We accept fills on a case-by-case basis, depending on the quality of the existing set. Send us a photo before booking, or book a removal and full set if you're unsure.",
    },
];

const lashLiftFaqs: FAQ[] = [
    {
        question: "How long does a lash lift last?",
        answer: "A lash lift typically lasts 6 to 8 weeks, depending on your natural lash growth cycle.",
    },
    {
        question: "What's the difference between a lash lift and lash extensions?",
        answer: "A lash lift uses a perming solution to curl your natural lashes upward — there's no added length or fullness. Lash extensions add individual fibers to each natural lash. Lifts are lower-maintenance; extensions are more dramatic.",
    },
    {
        question: "Can I wear mascara after a lash lift?",
        answer: "Yes, you can wear mascara after the first 24 hours. Many clients find they don't need it because their natural lashes look longer and more open.",
    },
    {
        question: "Is a lash lift safe?",
        answer: "Yes — the solutions used are designed for the delicate eye area and are applied by trained estheticians. We always perform a consultation to confirm there are no contraindications.",
    },
];

const browFaqs: FAQ[] = [
    {
        question: "How long does brow lamination last?",
        answer: "Brow lamination typically lasts 4 to 6 weeks, depending on your hair growth cycle and aftercare.",
    },
    {
        question: "What is brow lamination?",
        answer: "Brow lamination is a perming treatment that restructures your brow hairs so they lie in a uniform, brushed-up direction — creating a fuller, more defined brow without makeup.",
    },
    {
        question: "Can I get my brows wet after lamination?",
        answer: "Avoid getting your brows wet for the first 24 hours after the treatment. After that, normal washing is fine, but avoid heavy oils and exfoliants directly on the brow area.",
    },
    {
        question: "Should I get brow lamination or microblading?",
        answer: "Lamination is non-permanent, much less expensive, and ideal if you have enough brow hair to work with but want better shape. Microblading creates the appearance of hair where there is none — better for sparse brows.",
    },
];

const facialFaqs: FAQ[] = [
    {
        question: "How often should I get a facial?",
        answer: "For most skin types, a facial every 4 to 6 weeks aligns with your skin's natural renewal cycle and produces the most visible results.",
    },
    {
        question: "What should I do before my facial?",
        answer: "Avoid using retinol, exfoliating acids, or aggressive scrubs for 48 hours beforehand. Come with clean skin if possible — but we'll cleanse you anyway.",
    },
    {
        question: "Can I wear makeup after a facial?",
        answer: "We recommend giving your skin at least 4 to 6 hours of breathing room before applying makeup so the products we used can fully absorb.",
    },
    {
        question: "Will a facial help with acne?",
        answer: "Custom facials can absolutely help manage breakouts through deep cleansing, professional exfoliation, and targeted serums — but consistency matters more than a single visit.",
    },
];

const teethFaqs: FAQ[] = [
    {
        question: "How long does the whitening last?",
        answer: "Results typically last 6 to 12 months depending on your diet (coffee, tea, red wine, and tobacco are the main culprits) and oral care routine.",
    },
    {
        question: "Is the whitening gel safe for my enamel?",
        answer: "Yes — we use a professional-grade 16% hydrogen peroxide gel that is enamel-safe, vegan, gluten-free, kosher, and cruelty-free.",
    },
    {
        question: "Will my teeth be sensitive after whitening?",
        answer: "Some clients experience mild, temporary sensitivity for 24 to 48 hours. We recommend avoiding extremely hot or cold foods during that window.",
    },
    {
        question: "What should I avoid after whitening?",
        answer: "For the first 24 to 48 hours, avoid coffee, tea, red wine, dark sauces, berries, and tobacco — the 'white diet' window when your enamel is most porous.",
    },
];

const waxingFaqs: FAQ[] = [
    {
        question: "How long does my hair need to be for waxing?",
        answer: "Hair should be at least 1/4 inch (about the length of a grain of rice) for the wax to grip effectively. If it's much longer, we may trim before waxing.",
    },
    {
        question: "How long do waxing results last?",
        answer: "Most clients enjoy smooth skin for 3 to 6 weeks, depending on the area and your individual hair growth cycle.",
    },
    {
        question: "Does waxing hurt?",
        answer: "There's a quick sting, but it gets significantly easier with each appointment as your hair grows back finer. We use high-quality wax to minimize discomfort.",
    },
    {
        question: "How should I prepare for a wax?",
        answer: "Exfoliate gently 24 hours before your appointment. Avoid retinol, exfoliating acids, and sun exposure for 48 hours before. Skip moisturizer on the day of.",
    },
    {
        question: "What should I avoid after waxing?",
        answer: "For 24 to 48 hours, avoid hot showers, saunas, sun exposure, tight clothing on the waxed area, and heavy workouts. Resume gentle exfoliation after 48 hours to prevent ingrowns.",
    },
];

export function getFaqsForService(service: Service): FAQ[] {
    if (service.category === "Brows") return browFaqs;
    if (service.category === "Facials") return facialFaqs;
    if (service.category === "Teeth") return teethFaqs;
    if (service.category === "Waxing") return waxingFaqs;
    // Lashes — distinguish lift/tint from extensions
    if (service.slug.includes("lift") || service.slug.includes("tint")) return lashLiftFaqs;
    return lashesExtensionsFaqs;
}

const lashesAftercare = [
    "Keep lashes dry for the first 4 hours after application.",
    "Avoid oil-based makeup, cleansers, and skincare around the eyes.",
    "Brush lashes gently each morning with the spoolie provided.",
    "Cleanse lashes daily with a lash-extension-safe foam cleanser.",
    "Avoid rubbing your eyes, sleeping face-down, and waterproof mascara.",
    "Book a fill every 2 to 3 weeks to maintain a full look.",
];

const lashLiftAftercare = [
    "Keep lashes dry and free of products for the first 24 hours.",
    "Avoid steam, saunas, and hot showers for 24 hours.",
    "Don't rub your eyes or sleep face-down on the first night.",
    "Mascara can be reintroduced after 24 hours.",
    "Brush lashes gently each morning to maintain the lift.",
];

const browAftercare = [
    "Keep brows dry and product-free for 24 hours.",
    "Avoid steam, saunas, and heavy sweating for 24 hours.",
    "Brush brows daily to maintain shape.",
    "Avoid heavy oils, retinol, and exfoliating acids directly on brows.",
    "Book a touch-up every 4 to 6 weeks.",
];

const facialAftercare = [
    "Avoid touching your face for the rest of the day.",
    "Skip makeup for 4 to 6 hours if possible.",
    "Avoid retinol, exfoliating acids, and aggressive products for 48 hours.",
    "Wear SPF — your skin is more sensitive after exfoliation.",
    "Drink water and let the products do their work.",
];

const teethAftercare = [
    "Follow the 'white diet' for 24 to 48 hours: no coffee, tea, red wine, dark sauces, berries, or tobacco.",
    "Use a sensitivity-formulated toothpaste if you experience temporary sensitivity.",
    "Avoid extremely hot or cold foods for the first 48 hours.",
    "Maintain regular brushing and flossing for longer-lasting results.",
];

const waxingAftercare = [
    "Avoid hot showers, saunas, and steam for 24 to 48 hours.",
    "Skip sun exposure and tanning beds for 48 hours.",
    "Wear loose clothing on the waxed area for the first day.",
    "Avoid the gym and heavy sweating for 24 hours.",
    "Begin gentle exfoliation 48 hours after to prevent ingrown hairs.",
    "Moisturize daily once skin is no longer sensitive.",
];

export function getAftercareForService(service: Service): string[] {
    if (service.category === "Brows") return browAftercare;
    if (service.category === "Facials") return facialAftercare;
    if (service.category === "Teeth") return teethAftercare;
    if (service.category === "Waxing") return waxingAftercare;
    if (service.slug.includes("lift") || service.slug.includes("tint")) return lashLiftAftercare;
    return lashesAftercare;
}
