export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string; // HTML or Markdown content
    category: string;
    date: string;
    image: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "The Science Behind Mindful Meditation",
        excerpt: "Learn how regular mindfulness practice can reduce stress, improve focus, and enhance your mental well-being.",
        content: `
            <p class="mb-6">Vivamus posuere sapien sed purus convallis imperdiet. Morbi nec nunc eu lacus accumsan lobortis non ac neque. Aliquam interdum porta magna, ut aliquam arcu sollicitudin sed. In semper felis in sapien suscipit, cursus vel eget enim. Donec sodales faucibus neque, in placerat nisl eleifend id. Sed nec neque tristique, vestibulum nulla at, pulvinar eros. Curabitur ut elementum nisl, quis pharetra nulla. Donec at tempor ante, id scelerisque quam. Donec id lorem placerat, mollis enim id, luctus ex. Duis aliquet tincidunt blandit. Etiam commodo quam erat, eget finibus nisi pellentesque sed.</p>
            
            <p class="mb-6">Vivamus posuere sapien sed purus convallis imperdiet. Morbi nec nunc eu lacus accumsan lobortis non ac neque. Aliquam interdum porta magna, ut aliquam arcu sollicitudin sed. In semper felis in sapien suscipit, cursus vel eget enim. Donec sodales faucibus neque, in placerat nisl eleifend id. Sed nec neque tristique, vestibulum nulla at, pulvinar eros. Curabitur ut elementum nisl, quis pharetra nulla. Donec at tempor ante, id scelerisque quam. Donec id lorem placerat, mollis enim id, luctus ex. Duis aliquet tincidunt blandit. Etiam commodo quam erat, eget finibus nisi pellentesque sed.</p>

            <p>Vivamus posuere sapien sed purus convallis imperdiet. Morbi nec nunc eu lacus accumsan lobortis non ac neque. Aliquam interdum porta magna, ut aliquam arcu sollicitudin sed. In semper felis in sapien suscipit, cursus vel eget enim. Donec sodales faucibus neque, in placerat nisl eleifend id. Sed nec neque tristique, vestibulum nulla at, pulvinar eros. Curabitur ut elementum nisl, quis pharetra nulla. Donec at tempor ante, id scelerisque quam. Donec id lorem placerat, mollis enim id, luctus ex. Duis aliquet tincidunt blandit. Etiam commodo quam erat, eget finibus nisi pellentesque sed.</p>
        `,
        category: "Wellness",
        date: "Dec 19, 2025",
        image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=2072&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "10 Tips for Maintaining a Healthy Lifestyle",
        excerpt: "Discover simple yet effective ways to improve your overall health and well-being through daily habits.",
        content: `
            <p class="mb-6">Maintaining a healthy lifestyle doesn't have to be complicated. Small changes in your daily routine can lead to big results over time. Start by incorporating more water into your day, aiming for at least 8 glasses. Prioritize sleep, as it is the foundation of good health. Try to move your body for at least 30 minutes a day, whether it's a brisk walk, a yoga session, or a gym workout.</p>
            <p>Nutrition plays a key role as well. Focus on whole, unprocessed foods like fruits, vegetables, lean proteins, and whole grains. Avoid sugary drinks and excessive processed snacks. Remember, consistency is key. It's not about being perfect; it's about making better choices most of the time.</p>
        `,
        category: "Wellness",
        date: "Dec 15, 2025",
        image: "https://images.unsplash.com/photo-1544367563-12123d8959bd?q=80&w=2074&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Understanding Common Lab Tests and Results",
        excerpt: "Learn about the most common lab tests, what they measure, and how to interpret your results efficiently.",
        content: `
            <p class="mb-6">Lab tests are a vital part of modern healthcare, providing objective data about your body's function. Common tests like the Complete Blood Count (CBC) measure white and red blood cells to check for infection or anemia. The Basic Metabolic Panel (BMP) evaluates your glucose, calcium, and electrolyte levels.</p>
            <p>Understanding these results can empower you to take charge of your health. However, always consult with your doctor for a proper diagnosis and treatment plan. Lab results can be influenced by many factors, including diet, hydration, and medication.</p>
        `,
        category: "Lab Tests",
        date: "Dec 12, 2025",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "When to See a Doctor: Essential Health Indicators",
        excerpt: "Know the warning signs that require immediate medical attention and when to schedule a checkup.",
        content: `
            <p class="mb-6">It's easy to ignore minor symptoms, hoping they will go away on their own. However, some signs should never be ignored. Sudden, severe chest pain, difficulty breathing, or sudden weakness can be signs of a medical emergency. Unexplained weight loss, persistent fever, or changes in bowel habits also warrant a visit to the doctor.</p>
            <p>Regular checkups are equally important for detecting issues early when they are most treatable. Don't wait until you feel sick to see a doctor. Preventive care is the best way to maintain long-term health.</p>
        `,
        category: "Healthcare",
        date: "Dec 10, 2025",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop"
    }
];

export async function getBlogPost(id: string | number): Promise<BlogPost | undefined> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return blogPosts.find(post => post.id === Number(id));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return blogPosts;
}
