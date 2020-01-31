const AppParams = {
    // domain: 'http://192.168.1.6:8080/',
    // mainUrl: 'http://192.168.1.6:8080/api/',

    domain: 'http://5.189.134.90:8088/',
    mainUrl: 'http://5.189.134.90:8088/api/',
    makeUrl(url, data ?: {}): string {
        let u = new URL(this.mainUrl + url);
        const token = localStorage.getItem('auth_token');
        u.searchParams.append('token', token);
        for (let datum in data) {
            u.searchParams.append(datum, data[datum]);
        }
        return u.href;
    },
    makeStaticUrl(url) {
        if (url.charAt(0) === '/') {
            url = url.substr(1);
        }
        return this.domain + url;
    },
    getDataFromStorage(key): any {
        if (typeof key !== 'undefined') {
            return localStorage.getItem(key);
        }

        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }

        return values;
    },
    avatar(): string { return this.domain + 'images/profile-avatar.png'; },
    noImagePng(): string { return this.domain + 'images/no-image.png'; },
    genCharArray (charA, charZ): string[] {
        let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    },
    urls: {
        postLogin: 'login',
        refreshToken: 'refresh-token',
        chooseStudent: 'choose-student',
        journal: {
            index: 'journal',
            getBookDetailsById: 'journal/book-details',
            getWithingByLessonId: 'journal/writhing-details',
            getVocabularyOfLessonByStudentId: 'journal/get-lesson-vocabulary-by-student'
        },
        subscription: {
            getImages: 'subscription/get-images',
            getNotificationSettings: 'subscription/get-notification-settings',
            updateNotificationSettings: 'subscription/update-notification-settings',
        },
        books: {
            getStudentBooks: 'books/get-student-books'
        },
        dictionary: {
            getStudentMonthOfDictionaryByYear: 'dictionary/get-student-dictionary-months',
            getDictionaryWords: 'dictionary/search',
            getWordDetails: 'dictionary/word-details',
            makeWordAsViewed: 'dictionary/word-viewed'
        },
        fundamentals: {
            index: 'fundamentals',
            getCombinations: 'fundamentals/get-combination',
            getAbcWordsByLetter: 'fundamentals/get-abc-words',
            getCombinationWordsById: 'fundamentals/get-combination-words',
            getSyllablesByCount: 'fundamentals/get-syllable-words',
            getSightWordsBooks: 'fundamentals/get-sight-words-books',
            getWordsOfBookById: 'fundamentals/get-words-of-book',
        },
        quiz: {
            getFundamentalQuizzes: 'quiz/get-fundamentals',
            getQuizDataById: 'quiz/get-quiz-data/:quizId',
            getQuizStartData: 'quiz/get-quiz-start-data/:quizId',
            getQuizEndData: 'quiz/get-quiz-end-data/:quizId',
            submitQuiz: 'quiz/submit-quiz-data/:quizId',
        },
        settings: {
            updatePassword: 'settings/update-password'
        }
    },
};

export default AppParams;
