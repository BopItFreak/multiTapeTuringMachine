# Readme\_aberchel

Version 1 8/22/24

A copy of this file should be included in the github repository with your project. Change the teamname above to your own

1. Team name: aberchel  
2. Names of all team members: August Berchelmann  
3. Link to github repository: https://github.com/BopItFreak/multiTapeTuringMachine  
4. Which project options were attempted: Multitape turing machine (option 2\)  
5. Approximately total time spent on project: 4  
6. The language you used, and a list of libraries you invoked.  
   1. Node.js, fs, path modules  
7. How would a TA run your program (did you provide a script to run a test case?)  
   1. node multiTapeTuringMachine.js \[TM .csv file\] \[terminationFlag: true/false\]  
8. A brief description of the key data structures you used, and how the program functioned.  
   1. Tapes array to keep track of all the tapes  
   2. Heads array to keep track of all the heads of the tapes  
   3. turingMachine data structure to parse the .csv into JSON  
   4. Key functions: parseTuringMachineCSV, runTuringMachine  
   5. The program functions by taking a turing machine represented as a .csv file and a string and executing it, and returning an output, determining if the machine rejects or accepts.  
9. A discussion as to what test cases you added and why you decided to add them (what did they tell you about the correctness of your code). Where did the data come from? (course website, handcrafted, a data generator, other)  
   1. I used a test case created by me, as well as two other test cases created by other users on GitHub, and modified by me to work with my program’s required formatting. I added the specific test cases to test 1,2 and 3 tape TMs, and also to test all the required functions, such as moving the tape left, right, or staying, and the use of the wildcard.  
10. An analysis of the results, such as if timings were called for, which plots showed what? What was the approximate complexity of your program?  
    1. The program worked well, and produced accurate results. The program has a complexity of O(n)  
11. A description of how you managed the code development and testing.  
    1. I progressively tested and added more code as I went through the process. Once I got the program to a point where it could be run well, I used test cases to fix the edge cases  
12. Did you do any extra programs, or attempted any extra test cases  
    1. No

