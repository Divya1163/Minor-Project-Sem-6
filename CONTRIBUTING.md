# Contributing to Thermal Comfort Prediction System

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/thermal-comfort-predictor.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Follow the setup instructions in README.md

## Development Setup

```bash
# Install dependencies
npm install
pip install -r requirements.txt

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## Making Changes

### Code Style

- Use TypeScript for type safety
- Follow existing code patterns
- Run prettier before committing: `npx prettier --write "**/*.{ts,tsx,json,md}"`
- Ensure ESLint passes: `npm run lint`

### Git Commits

- Use descriptive commit messages
- Reference issues when applicable: `git commit -m "Fix: resolve issue #123 - description"`
- Keep commits focused and atomic
- Examples:
  - `feat: add new prediction feature`
  - `fix: correct model accuracy calculation`
  - `docs: update README with new instructions`
  - `refactor: improve component structure`

### Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates

## Submitting Changes

1. Push to your fork
2. Create a Pull Request with a clear title and description
3. Reference related issues: `Closes #123`
4. Ensure all CI checks pass
5. Request review from maintainers
6. Address feedback and requested changes

### PR Title Format

- `feat: add new feature`
- `fix: resolve bug in component`
- `docs: update documentation`
- `refactor: improve code structure`
- `test: add unit tests`

## ML Model Changes

If modifying the ML training pipeline:

1. Document data sources and preprocessing steps
2. Include model metrics and accuracy reports
3. Test with both datasets (ASHRAE and India)
4. Update PICKLE_MODEL_GUIDE.md if applicable
5. Add before/after performance comparison

## Adding New Features

1. **Frontend Components**
   - Create reusable, well-documented components
   - Use shadcn/ui components where possible
   - Add TypeScript types
   - Include accessibility attributes (ARIA)
   - Test on mobile and desktop

2. **API Routes**
   - Follow RESTful conventions
   - Include input validation
   - Add error handling with meaningful messages
   - Document request/response formats
   - Add TypeScript types for request/response

3. **ML/Backend**
   - Include model documentation
   - Test with multiple datasets
   - Validate predictions against known values
   - Document performance metrics
   - Update requirements.txt if adding dependencies

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test across different browsers and devices
- Validate ML model predictions

## Documentation

- Update README.md for user-facing changes
- Update relevant .md files in the root directory
- Include code comments for complex logic
- Document new environment variables in .env.example

## Performance Considerations

- Optimize component renders (avoid unnecessary re-renders)
- Monitor bundle size changes
- Test ML model inference time
- Profile application for bottlenecks

## Reporting Issues

When reporting bugs, include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/error logs if applicable
- Environment details (browser, OS, etc.)

## Questions?

- Check existing documentation in the root directory
- Review existing issues and discussions
- Open a new discussion for questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to making thermal comfort prediction more accessible!
