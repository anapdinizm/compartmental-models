# Compartimental models

It's a visual tool (HTML/JavaScript) to interact with compartmental models like SIR, SEIR and the compartmental model SEIR considering dead and hospitalized people.

The online version and more explanation about SIR model can be seen here: [https://anapdinizm.github.io/compartmental_model/sir_model.html](https://anapdinizm.github.io/compartmental_model/sir_model.html).

This project is licensed under the terms of the [MIT License](https://mit-license.org/).

![Compartimentos do modelo SIR](/images/sir_model.png)

$$\begin{cases}
      \frac{dS}{dt}=-\beta S\frac{I}{N}; \\ 
      \frac{dI}{dt}=\beta S\frac{I}{N} - \nu I; \\
      \frac{dR}{dt}=\nu I;
    \end{cases} $$

Sendo, $\inline N=S+I+R$ a população total.



