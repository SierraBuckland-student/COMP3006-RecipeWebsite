// Global configurations file
const configurations = {
    'db' : 'mongodb+srv://admin:admin@cluster0.7gaid.mongodb.net/recipes',
    //google auth
    'google': {
        'clientId': '367124697846-h2f3n08tje0r6s3ug2jc1rmlt92b5f9k.apps.googleusercontent.com',
        'clientSecret': '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',
        'callbackUrl': 'https://comp3006recipewebsite.herokuapp.com/auth/google/callback'
    },
    //github auth
    'github': {
        'clientId': 'c4a49bad7aa82bd621f1',
        'clientSecret': '60d0667e91a1c9733204620bb5627b3b882dd46c',
        'callbackUrl': 'https://comp3006recipewebsite.herokuapp.com/auth/github/callback'
    }
}

//exporting
module.exports = configurations