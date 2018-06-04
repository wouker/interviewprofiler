# interviewprofiler

CONNECT-ICT

demo tool to guide with the assertion of candidates during an interview.

Goal:

Creating a website (SPA) for an interviewer, allowing him to set scores to a list of questions in different categories.
The questions should be edited/added/removed in a seperate screen (in a json).
All the logic is 100% frontend (for the sake of the exercise).

Each time a score has been changed, a general score and score per theme should be calculated.
At the end of the interview, a summary should be generated and be able to be saved as a csv (so it can be read via excel).

Technology:

- Angular 6
- Angular CLI
- ng2Material
- Sass
- Rxjs 5
- Webpack 4
- tslint

- architecture: 
  - component based with reactive forms 
  - component based themeing with scss-files
  - immutable inputs on components!

Coding guidelines:

- linter must be followed
- all code should be checked in to master via code reviews/pull requests.
- small pull requests. Try to work in 'stories'.
- mobile first.
- Wireframes should be created and approved before starting design
- follow best practices

Details:

- 2 pages, also visible via url:
  - default pages open on 'interview -page.
    * header where 
      * a name can be entered.
      * editeable date, default on today
      * Load button to load a json conatining previous registered scores
      * clear button to reset the form (with a warning)
      * export button to export the score
      * general score
    * tabs with a tab per theme
    * on each tab an accordion per category wherein questions are set    *
  - management page to edit the json with questions.
- a score is an integer between 0 and  10. 0 meaning not applicable (should not be evaluated). 1 lowest - 10 highest.
- each score has a weight.
- a Total score is a weighed average of the scores for that theme (or total)
- a theme defines which skill-aspect the question adheres to. All themes are defined in Json and not explicitly known in code.
  Default themes are 'Generic skills' - 'Technical backend' - 'Technical frontend (but can be extended as stated before).
  Each theme should be visualised as a tab on the questions page.
- a category is a group/container for questions. A theme contains 1 or more categories (themes with 0 categories are ignored on building of the page). A category is visualised in the header of the accordeon together with its score. A category is the lowest level we score with a slider (0 to 10 with default 0) and an inputbox. the value of the slider and inputbox are the same.
- a question is a single question. A single question has no points. The interviewer sets a score on a category based on the answers of the questions. At this point there is no logic to automatically rate questions.

LoadProcess: read json => foreach theme create a tab. => on this tab foreach category create an accordeon => in accordeon the questions


Phase 2:
Setting a norm and a wanted profile. Choosing a profile will set the norms for that profile. Some themes/categories/questions are not applicable to certain profiles. Norms are also editeable in managementscreen.
