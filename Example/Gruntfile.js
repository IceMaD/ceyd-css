module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var ConfigBuild = {
        config: {},

        reloadOptions: {
            interrupt: true,
            livereload: true
        },

        sass: function(name) {
            this.config.sass = this.config.sass || {};

            var config = {
                files: {}
            };

            config.files['dist/css/' + name + '.css'] = 'src/sass/' + name + '.scss';

            this.config.sass[name] = config;

            return this;
        },

        watch: function(directory, name) {
            this.config.watch = this.config.watch || {};

            this.config.watch[name] = {
                files: 'src/' + directory + '/**/*.scss',
                tasks: [directory + ':' + name],
                options: this.reloadOptions
            }
        },

        reloadOnChange: function(name, files) {
            this.config.watch = this.config.watch || {};

            this.config.watch[name] = {
                files: files,
                options: this.reloadOptions
            }
        }
    };

    ConfigBuild.config.connect = {server: {}};

    ConfigBuild.sass('style');
    ConfigBuild.watch('sass', 'style');
    ConfigBuild.reloadOnChange('html', '**/*.html');

    grunt.initConfig(ConfigBuild.config);

    grunt.registerTask('default', ['connect', 'watch']);
};
