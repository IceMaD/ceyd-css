module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var ConfigBuild = {
        config: {},

        addSass: function(name) {
            this.config.sass = this.config.sass || {};

            var config = {
                files: {}
            };

            config.files['dist/css/' + name + '.css'] = 'src/sass/' + name + '.scss';

            this.config.sass[name] = config;

            return this;
        },

        addWatch: function(directory, name) {
            this.config.watch = this.config.watch || {};

            this.config.watch[name] = {
                files: 'src/' + directory + '/**/*.scss',
                tasks: [directory + ':' + name],
                options: {
                    interrupt: true,
                    livereload: true
                }
            }
        }
    };

    ConfigBuild.config.connect = {server: {}};

    ConfigBuild.addSass('style');
    ConfigBuild.addWatch('sass', 'style');

    grunt.initConfig(ConfigBuild.config);

    grunt.registerTask('default', ['connect', 'watch']);
};
