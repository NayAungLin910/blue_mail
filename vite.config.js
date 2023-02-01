import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/js/welcome.jsx',
                'resources/js/categories.jsx',
                'resources/js/stories.jsx',
                'resources/js/storiesCreate.jsx',
                'resources/js/storiesEdit.jsx',
                'resources/js/mailStoriesCreate.jsx',
                'resources/js/mailStoriesView.jsx',
                'resources/js/navCategorySearch.jsx',
                'resources/js/storiesFavourite.jsx',
                'resoruces/js/profile.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
});
