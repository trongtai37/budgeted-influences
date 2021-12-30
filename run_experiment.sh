budgets=(10, 20, 30, 40, 50);
algorithms=(2);
epsilons=(0.1, 0.2, 0.3);

for budget in "${budgets[@]}"
do 
  for algorithm in "${algorithms[@]}"
  do
    for epsilon in "${epsilons[@]}"
    do
      ./ksub -f data/facebook_combined.txt -V 4039 -t 0 -a $algorithm -e $epsilon -B $budget;
    done
  done
done


for budget in "${budgets[@]}"
do 
  ./ksub -f data/facebook_combined.txt -V 4039 -t 0 -a 0 -B $budget;
done
