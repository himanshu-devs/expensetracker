package com.ex.expensetracker.controller;

import com.ex.expensetracker.model.Expense;
import com.ex.expensetracker.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalDate;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    private ExpenseRepository expenseRepository;


    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        expense.setDate(LocalDate.now());
        return expenseRepository.save(expense);
    }
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
    }
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense newExpense) {

        Expense expense = expenseRepository.findById(id).orElse(null);

        if (expense != null) {
            expense.setTitle(newExpense.getTitle());
            expense.setAmount(newExpense.getAmount());
            expense.setCategory(newExpense.getCategory());
            return expenseRepository.save(expense);
        }

        return null;
    }
}
